import type { Branch, Category, Offer, Product } from "@/types";

export const categories: Category[] = [
  { id: "grills", name: "مشويات", description: "فحم هادئ وتتبيلات شرقية", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" },
  { id: "mains", name: "أطباق رئيسية", description: "وصفات عربية بتقديم فاخر", image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1200&auto=format&fit=crop" },
  { id: "starters", name: "مقبلات", description: "بداية خفيفة وغنية", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop" },
  { id: "desserts", name: "حلويات", description: "لمسة شرقية أخيرة", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop" },
  { id: "drinks", name: "مشروبات", description: "بارد، منعش، ومتوازن", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop" },
];

export const products: Product[] = [
  {
    id: "mixed-grill",
    slug: "mixed-grill",
    name: "ميكس جريل فاخر",
    description: "كفتة، كباب، شيش طاووق وريش بتتبيلة FLAVRE الخاصة.",
    categoryId: "grills",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    featured: true,
    prepTime: "25 دقيقة",
    variants: [
      { id: "single", name: "فرد", price: 280 },
      { id: "double", name: "فردين", price: 520 },
      { id: "family", name: "عائلي", price: 890 },
    ],
    addons: [
      { id: "rice", name: "أرز بسمتي", price: 35 },
      { id: "bread", name: "عيش بلدي إضافي", price: 15 },
      { id: "tahini", name: "طحينة", price: 20 },
    ],
  },
  {
    id: "mandi-lamb",
    slug: "mandi-lamb",
    name: "مندي لحم",
    description: "لحم طري مطهو ببطء فوق أرز مبهر ومكسرات محمصة.",
    categoryId: "mains",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    featured: true,
    prepTime: "35 دقيقة",
    variants: [
      { id: "regular", name: "عادي", price: 310 },
      { id: "large", name: "كبير", price: 420 },
    ],
    addons: [
      { id: "salad", name: "سلطة خضراء", price: 25 },
      { id: "sauce", name: "دقوس حار", price: 15 },
      { id: "nuts", name: "مكسرات إضافية", price: 30 },
    ],
  },
  {
    id: "shawarma-box",
    slug: "shawarma-box",
    name: "بوكس شاورما عربي",
    description: "شاورما دجاج مقطعة مع ثومية، بطاطس، مخلل وخبز صاج.",
    categoryId: "mains",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    featured: true,
    prepTime: "18 دقيقة",
    variants: [
      { id: "chicken", name: "دجاج", price: 165 },
      { id: "beef", name: "لحم", price: 195 },
      { id: "mix", name: "ميكس", price: 215 },
    ],
    addons: [
      { id: "garlic", name: "ثومية إضافية", price: 15 },
      { id: "fries", name: "بطاطس إضافية", price: 30 },
      { id: "cheese", name: "جبنة", price: 25 },
    ],
  },
  {
    id: "mezze",
    slug: "mezze",
    name: "طبق مزات شرقي",
    description: "حمص، بابا غنوج، ورق عنب، مخللات وخبز طازج.",
    categoryId: "starters",
    image: "https://images.unsplash.com/photo-1542528180-a1208c5169a5?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
    prepTime: "12 دقيقة",
    variants: [
      { id: "small", name: "صغير", price: 95 },
      { id: "large", name: "كبير", price: 155 },
    ],
    addons: [
      { id: "vine", name: "ورق عنب إضافي", price: 35 },
      { id: "hummus", name: "حمص إضافي", price: 25 },
    ],
  },
  {
    id: "kunafa",
    slug: "kunafa",
    name: "كنافة كريمة وفستق",
    description: "كنافة مقرمشة، كريمة خفيفة، فستق وشربات متوازن.",
    categoryId: "desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    featured: true,
    prepTime: "10 دقائق",
    variants: [
      { id: "piece", name: "قطعة", price: 75 },
      { id: "tray", name: "صينية", price: 360 },
    ],
    addons: [
      { id: "pistachio", name: "فستق إضافي", price: 35 },
      { id: "cream", name: "كريمة إضافية", price: 25 },
    ],
  },
  {
    id: "mint-lemon",
    slug: "mint-lemon",
    name: "ليمون نعناع",
    description: "ليمون طازج، نعناع، ثلج مجروش ولمسة عسل.",
    categoryId: "drinks",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
    prepTime: "6 دقائق",
    variants: [
      { id: "regular", name: "عادي", price: 55 },
      { id: "large", name: "كبير", price: 75 },
    ],
    addons: [
      { id: "honey", name: "عسل إضافي", price: 10 },
      { id: "soda", name: "صودا", price: 15 },
    ],
  },
];

export const offers: Offer[] = [
  { id: "o1", title: "خصم الافتتاح", description: "خصم 10% على أول طلب من المنيو.", code: "FLAVRE10", discountPercent: 10 },
  { id: "o2", title: "عرض العائلة", description: "وفر 25 جنيه على الطلبات فوق 400 جنيه.", code: "ARABIC25", discountPercent: 0 },
];

export const branches: Branch[] = [
  { id: "b1", name: "فرع القاهرة الجديدة", address: "شارع التسعين، القاهرة الجديدة", hours: "12:00 م - 1:00 ص", phone: "01148618451" },
  { id: "b2", name: "فرع مدينة نصر", address: "عباس العقاد، مدينة نصر", hours: "1:00 م - 2:00 ص", phone: "01148618451" },
  { id: "b3", name: "فرع الشيخ زايد", address: "محور الشباب، الشيخ زايد", hours: "12:00 م - 12:00 ص", phone: "01148618451" },
];

export const faqs = [
  { q: "هل يوجد توصيل؟", a: "نعم، التوصيل متاح لمعظم المناطق القريبة من فروعنا." },
  { q: "متى يصل الطلب؟", a: "عادة بين 30 و45 دقيقة حسب المنطقة وضغط الفرع." },
  { q: "هل يمكن تخصيص الطبق؟", a: "نعم، يمكنك اختيار الحجم والإضافات وكتابة ملاحظات خاصة قبل التأكيد." },
  { q: "هل يمكن الاستلام من الفرع؟", a: "نعم، اختار الاستلام وحدد الفرع المناسب أثناء تأكيد الطلب." },
];

export const testimonials = [
  { name: "مريم علي", text: "تجربة فاخرة فعلًا، الطلب واضح وسريع والطعم ممتاز.", rating: 5 },
  { name: "أحمد سمير", text: "المنيو منظم والتخصيص سهل جدًا على الموبايل.", rating: 5 },
  { name: "ندى يوسف", text: "ستايل راقي وينفع لأي براند مطعم عربي.", rating: 5 },
];
