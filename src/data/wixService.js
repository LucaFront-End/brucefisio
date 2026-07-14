// Wix Headless Stores Catalog V1 Fetching Service - Bruce Médica

const WIX_CLIENT_ID = "6aa1ab42-1d0f-4ea1-a4ae-fcd6b67e9ff9";
const SITE_ID = "7bc7f0df-a245-45a3-9797-040d15649851";

/**
 * Obtains an anonymous visitor access token from Wix OAuth
 */
async function getWixAccessToken() {
  const baseUrl = 'https://www.wixapis.com';
  const res = await fetch(`${baseUrl}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: WIX_CLIENT_ID,
      grantType: "anonymous"
    })
  });
  
  if (!res.ok) {
    throw new Error(`Wix OAuth failed: ${res.statusText}`);
  }
  
  const data = await res.json();
  return data.access_token;
}

/**
 * Resolves a beautiful visual background gradient dynamically based on product category
 */
function getCategoryGradient(categoryName) {
  const cat = categoryName.toLowerCase();
  if (cat.includes("electroterapia") || cat.includes("ultrasonido")) {
    return "linear-gradient(135deg, #e0f2fe 0%, #0284c7 100%)"; // Soft Blue
  } else if (cat.includes("fuerza") || cat.includes("equilibrio")) {
    return "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)"; // Soft Teal
  } else if (cat.includes("deporte") || cat.includes("entrenamiento")) {
    return "linear-gradient(135deg, #ffedd5 0%, #f97316 100%)"; // Soft Orange/Copper
  } else if (cat.includes("masaje") || cat.includes("estiramiento")) {
    return "linear-gradient(135deg, #f1f5f9 0%, #475569 100%)"; // Soft Slate
  } else if (cat.includes("plantillas") || cat.includes("talonera") || cat.includes("soporte") || cat.includes("compresión")) {
    return "linear-gradient(135deg, #fae8ff 0%, #d946ef 100%)"; // Soft Pink/Fuchsia
  } else if (cat.includes("mesa") || cat.includes("camilla")) {
    return "linear-gradient(135deg, #fef3c7 0%, #d97706 100%)"; // Soft Gold/Amber
  }
  return "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)"; // Default light clean grey
}

/**
/**
 * Parses variables from Wix product options
 */
function parseProductVariables(wixProduct, resolvedCategory) {
  // If the product has native options configured in Wix, map them
  if (wixProduct.productOptions && wixProduct.productOptions.length > 0) {
    // Find first non-empty option
    const option = wixProduct.productOptions.find(opt => opt.choices && opt.choices.length > 0);
    if (option) {
      return {
        name: option.name || "Opción",
        options: option.choices.map(choice => {
          let imageUrl = null;
          if (choice.media) {
            imageUrl = choice.media.mainMedia?.image?.url || choice.media.items?.[0]?.image?.url || null;
            // Handle Wix internal image URIs if any
            if (imageUrl && imageUrl.startsWith('wix:image://v1/')) {
               const parts = imageUrl.split('/');
               const filename = parts[3];
               imageUrl = `https://static.wixstatic.com/media/${filename}`;
            }
          }
          return {
            value: choice.description || choice.value,
            image: imageUrl
          };
        })
      };
    }
  }

  // If no native variables configured in CMS, return null so UI hides variant selector
  return null;
}

/**
 * Strips HTML tags from Wix description strings
 */
function stripHtml(htmlString) {
  if (!htmlString) return "Sin descripción disponible.";
  return htmlString
    .replace(/<[^>]*>/g, " ")       // Strip all HTML tags
    .replace(/\s+/g, " ")          // Normalize spaces
    .trim();
}

/**
 * Queries Wix Stores V1 collections to map IDs to category names
 */
async function fetchWixCollections(token) {
  const baseUrl = 'https://www.wixapis.com';
  const res = await fetch(`${baseUrl}/stores/v1/collections/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      query: { limit: 100 }
    })
  });

  if (!res.ok) {
    throw new Error(`Wix Collections query failed: ${res.statusText}`);
  }

  const data = await res.json();
  const collectionsMap = {};
  
  if (data.collections) {
    data.collections.forEach(col => {
      collectionsMap[col.id] = col.name;
    });
  }

  return collectionsMap;
}

/**
 * Creates an SEO friendly slug from a string
 */
function slugify(text) {
  if (!text) return "";
  return text.toString().toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, ''); 
}

/**
 * Queries Wix Stores Catalog V1 and returns formatted product records
 */
export async function fetchProductsFromWix() {
  try {
    const token = await getWixAccessToken();
    
    // 1. Fetch categories map
    const collectionsMap = await fetchWixCollections(token);
    
    // 2. Fetch all products using pagination
    let allProducts = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;
    const baseUrl = 'https://www.wixapis.com';

    while (hasMore) {
      const res = await fetch(`${baseUrl}/stores/v1/products/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          query: {
            paging: {
              limit: limit,
              offset: offset
            }
          }
        })
      });
      
      if (!res.ok) {
        throw new Error(`Wix Stores query failed: ${res.statusText}`);
      }
      
      const data = await res.json();
      if (!data.products || data.products.length === 0) {
        hasMore = false;
        break;
      }
      
      allProducts = allProducts.concat(data.products);
      
      if (data.products.length < limit) {
        hasMore = false;
      } else {
        offset += limit;
      }
    }

    if (allProducts.length === 0) {
      return [];
    }
    
    return allProducts.map(prod => {
      // Resolve category name (look for first collection ID that isn't "All Products")
      let resolvedCategory = "General";
      if (prod.collectionIds && prod.collectionIds.length > 0) {
        const customColId = prod.collectionIds.find(id => id !== "00000000-000000-000000-000000000001");
        if (customColId && collectionsMap[customColId]) {
          resolvedCategory = collectionsMap[customColId];
        }
      }

      // Resolve main image URL
      let imageUrl = prod.media?.mainMedia?.image?.url || "";
      if (imageUrl && imageUrl.startsWith('wix:image://v1/')) {
         const parts = imageUrl.split('/');
         const filename = parts[3];
         imageUrl = `https://static.wixstatic.com/media/${filename}`;
      }
      const rawName = prod.name || "Producto sin nombre";
      
      return {
        id: prod.id,
        slug: slugify(rawName) + "-" + prod.id.substring(0,4), // Append short ID to guarantee uniqueness
        name: rawName,
        sku: prod.sku || "",
        description: stripHtml(prod.description),
        rawDescription: prod.description || "",
        price: Number(prod.priceData?.price || prod.price?.price || 0),
        category: resolvedCategory,
        brand: prod.brand || "BRUCE MÉDICA",
        imageBg: "#ffffff",
        imageSvg: "", // Uses real photos, HTML img tags will render
        image: imageUrl,
        quoteOnly: !prod.price?.price || prod.price.price === 0,
        variables: parseProductVariables(prod, resolvedCategory),
        additionalInfoSections: prod.additionalInfoSections || []
      };
    });
  } catch (err) {
    console.error("Wix Headless Stores V1 Catalog fetch error:", err);
    throw err;
  }
}

/**
 * Fetches a single product by ID from Wix Stores to retrieve variants data
 */
export async function fetchProductById(id) {
  try {
    const token = await getWixAccessToken();
    const baseUrl = 'https://www.wixapis.com';
    const res = await fetch(`${baseUrl}/stores/v1/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    
    if (!res.ok) {
      throw new Error(`Wix Product fetch failed: ${res.statusText}`);
    }
    
    const data = await res.json();
    if (!data.product) return null;
    
    const prod = data.product;
    const collectionsMap = await fetchWixCollections(token);
    
    let resolvedCategory = "General";
    if (prod.collectionIds && prod.collectionIds.length > 0) {
      const customColId = prod.collectionIds.find(id => id !== "00000000-000000-000000-000000000001");
      if (customColId && collectionsMap[customColId]) {
        resolvedCategory = collectionsMap[customColId];
      }
    }

    let imageUrl = prod.media?.mainMedia?.image?.url || "";
    if (imageUrl && imageUrl.startsWith('wix:image://v1/')) {
       const parts = imageUrl.split('/');
       const filename = parts[3];
       imageUrl = `https://static.wixstatic.com/media/${filename}`;
    }

    return {
      id: prod.id,
      slug: slugify(prod.name || "") + "-" + prod.id.substring(0,4),
      name: prod.name,
      sku: prod.sku || "",
      description: stripHtml(prod.description),
      rawDescription: prod.description || "",
      price: Number(prod.priceData?.price || prod.price?.price || 0),
      category: resolvedCategory,
      brand: prod.brand || "BRUCE MÉDICA",
      imageBg: "#ffffff",
      imageSvg: "", 
      image: imageUrl,
      quoteOnly: !prod.price?.price || prod.price.price === 0,
      variables: parseProductVariables(prod, resolvedCategory),
      additionalInfoSections: prod.additionalInfoSections || [],
      variants: (prod.variants || []).map(v => {
        let vImg = v.variant?.media?.mainMedia?.image?.url || null;
        if (vImg && vImg.startsWith('wix:image://v1/')) {
           const parts = vImg.split('/');
           const filename = parts[3];
           vImg = `https://static.wixstatic.com/media/${filename}`;
        }
        return {
          id: v.id,
          choices: v.choices,
          price: Number(v.variant?.priceData?.price || v.variant?.price?.price || 0),
          sku: v.variant?.sku || "",
          image: vImg,
          inStock: v.stock?.inStock ?? true,
          quantity: v.stock?.quantity ?? 0
        };
      })
    };
  } catch (err) {
    console.error(`Wix single product fetch error for ID ${id}:`, err);
    return null;
  }
}
