// Complete food image mapping for ALL recipe IDs in the database
// Each recipe ID maps to a unique, relevant Unsplash image

export const foodImages: Record<string, string> = {
  // === JAPANESE ===
  "sushi-rolls":
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
  ramen: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800",
  "miso-ramen":
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
  gyudon:
    "https://images.unsplash.com/photo-1682566509605-b5bb1ef7eac2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  okonomiyaki:
    "https://plus.unsplash.com/premium_photo-1722593856486-5f87f9fca308?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  takoyaki:
    "https://cdn.pixabay.com/photo/2016/08/23/11/27/food-1614130_1280.jpg",
  "katsu-curry":
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800",

  // === THAI ===
  "pad-thai": "https://as1.ftcdn.net/v2/jpg/16/47/05/40/1000_F_1647054030_MZYLLL69c5zv9MRvydiK8HtXG7VtM93Z.jpg",
  "green-curry":
    "https://as2.ftcdn.net/v2/jpg/08/82/65/83/1000_F_882658359_wzkrfkWy0QvAJUdRT0O0dXJr9MFLErf5.jpg",
  "tom-yum":"https://as2.ftcdn.net/v2/jpg/17/06/32/61/1000_F_1706326142_WknO7JFK7z2lO3FqsXAlGJYXaXopSdAw.jpg",
  "massaman-curry":
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
  "som-tam":
    "https://as1.ftcdn.net/v2/jpg/07/26/25/56/1000_F_726255613_4NWsRNgkI2TuUvMrPghaFUU8Vb9COtY8.jpg",
  "mango-sticky-rice":
    "https://as2.ftcdn.net/v2/jpg/15/26/30/49/1000_F_1526304968_3zgeUrlDIGlAygDeDEfjlUCKbkS8L9AB.jpg",

  // === INDIAN ===
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
  "biryani-hyderabadi":
    "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800",
  "butter-chicken":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
  samosa: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
  "dal-makhani":
    "https://as1.ftcdn.net/v2/jpg/16/84/06/74/1000_F_1684067415_SRuU25TQSX4stAn2R3OOnKpUgzsusvvC.jpg",
  "palak-paneer":
    "https://as1.ftcdn.net/v2/jpg/15/71/91/76/1000_F_1571917620_LyAKJVrRA0emGVxRB3zDDXx1JIzYhWmw.jpg",
  "tandoori-chicken":
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800",
  dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "chole-bhature":
    "https://as1.ftcdn.net/v2/jpg/16/70/04/60/1000_F_1670046050_1u7AgUpOmiSkCsBmNAp6W6GaLKfqU5hO.jpg",
  "paneer-tikka":
    "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "pav-bhaji":
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800",
  "pani-puri":
    "https://cdn.pixabay.com/photo/2024/02/28/04/13/ai-generated-8601143_1280.jpg",

  // === CHINESE ===
  "kung-pao-chicken":
    "https://as1.ftcdn.net/v2/jpg/05/68/99/32/1000_F_568993286_22qJCumGSys4Wfnoz8OkxR56lxOZtlGM.jpg",
  "dim-sum": "https://as1.ftcdn.net/v2/jpg/15/96/57/16/1000_F_1596571621_927rP7Cvz4So28balea9EjyRLnGDVezj.jpg",
  "peking-duck":
    "https://as2.ftcdn.net/v2/jpg/08/91/30/81/1000_F_891308114_UBEP3D2Y6PYnrx9Jch2U9L9LHyKeGaAY.jpg",
  "mapo-tofu":
    "https://as1.ftcdn.net/v2/jpg/13/69/09/26/1000_F_1369092698_rlAmal3BnnyShGoAq465MMo8vTj3VOwO.jpg",
  "fried-rice":
    "https://as2.ftcdn.net/v2/jpg/18/44/95/41/1000_F_1844954197_Vt9eXCGxtTe5S9OEwyXyijN6vIq8Ldkq.jpg",
  "spring-rolls":
    "https://as1.ftcdn.net/v2/jpg/18/25/50/62/1000_F_1825506282_VnWjpQx1VawxNNN55h4sOISIVf2t7RR0.jpg",
  "hot-pot":
    "https://as2.ftcdn.net/v2/jpg/18/40/35/53/1000_F_1840355378_i6ZAH4Ova6cDlClCjlvJNEGfXTfkQDdD.jpg",
  "char-siu": "https://as2.ftcdn.net/v2/jpg/18/38/42/85/1000_F_1838428591_zzHUmmfe4TqbFVitwU90AhflI1Tjo9tT.jpg",
  "wonton-soup":
    "https://as1.ftcdn.net/v2/jpg/17/06/38/22/1000_F_1706382267_MEcnTeuSZ7IfOOh9xYhYsn6srMqzNjZn.jpg",
  dumplings:
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800",

  // === VIETNAMESE ===
  pho: "https://as2.ftcdn.net/v2/jpg/01/10/73/63/1000_F_110736391_SeqUiJn9eQpSytzZ0ccDmM8mvaUbfhvy.jpg",
  "banh-mi":
    "https://as2.ftcdn.net/v2/jpg/17/79/70/61/1000_F_1779706120_G7UTn8lKoPR9rcKshqHcbHONFS0DRe9r.jpg",
  "bun-cha": "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",

  // === KOREAN ===
  bibimbap: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
  "kimchi-jjigae":
    "https://as1.ftcdn.net/v2/jpg/16/86/35/10/1000_F_1686351058_KI8ZyV8rxWpf41IFou1zHDNnTMb2riq7.jpg",
  bulgogi: "https://as1.ftcdn.net/v2/jpg/16/50/19/72/1000_F_1650197210_kh19JmeydXUyqIEsc2FLMclavbLWXbRC.jpg",
  "korean-fried-chicken":
    "https://as1.ftcdn.net/v2/jpg/15/76/33/36/1000_F_1576333699_0dBkwEN40OizceNQOBV8DU9Scj2NOggN.jpg",
  japchae: "https://as2.ftcdn.net/v2/jpg/05/82/24/65/1000_F_582246530_occ5SceQZVcQPs02kCFiEahwy6TA7RqH.jpg",

  // === INDONESIAN/MALAYSIAN ===
  "nasi-goreng":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  rendang: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800",

  // === ITALIAN ===
  "pasta-carbonara":
    "https://as2.ftcdn.net/v2/jpg/16/23/12/05/1000_F_1623120572_StcMxGO1BHTX8toreRq3MvfB6H8S0yMV.jpg",
  carbonara:
    "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
  "margherita-pizza":
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  risotto: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800",
  lasagna: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800",
  tiramisu:
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800",
  ossobuco:
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800",
  bruschetta:
    "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800",
  gnocchi: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
  "panna-cotta":
    "https://as1.ftcdn.net/v2/jpg/18/56/40/46/1000_F_1856404691_j86VdUQNCSV37VsR93GGy477uKGyhrVY.jpg",

  // === FRENCH ===
  croissants: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
  "coq-au-vin":
    "https://as2.ftcdn.net/v2/jpg/18/63/34/41/1000_F_1863344169_TyuECokyYsk6Nb7PnWb4Jf0zKWNXuOOy.jpg",
  "beef-bourguignon":
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800",
  "quiche-lorraine":
    "https://images.unsplash.com/photo-1573053986614-5f38f5a11e91?w=800",
  crepes: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800",
  ratatouille:
    "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800",
  "onion-soup":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",

  // === SPANISH ===
  paella:
    "https://as2.ftcdn.net/v2/jpg/17/49/19/61/1000_F_1749196137_RxTLgQHbg5yrRcxPJpZ0nEX8uqGN6Fc0.jpg",
  gazpacho:
    "https://as2.ftcdn.net/v2/jpg/14/27/08/57/1000_F_1427085782_vxrYKQ2HqtV1nmCwNubVEQdwp7w2qDvN.jpg",
  "tortilla-espanola":
    "https://as1.ftcdn.net/v2/jpg/18/52/23/76/1000_F_1852237616_GqYY4k5DNiQB6eMDCdlccQfnPisnr0tL.jpg",
  "patatas-bravas":
    "https://as1.ftcdn.net/v2/jpg/17/11/88/34/1000_F_1711883430_jhJMMrAgPDjTPXuaVrRFHNLeBuLuP1ph.jpg",

  // === GREEK ===
  moussaka: "https://as2.ftcdn.net/v2/jpg/18/42/58/15/1000_F_1842581552_Lt3fneTr8DObogGFSzrqRgaclkTIYQId.jpg",
  gyros: "https://as2.ftcdn.net/v2/jpg/17/74/64/49/1000_F_1774644935_d0e4Rnid9MNPa5Fx24lL6q2YUoUaVCGg.jpg",
  souvlaki: "https://as2.ftcdn.net/v2/jpg/17/28/37/55/1000_F_1728375591_9PfKB5Xlz4JZ4NuVmrnvxMJkgxkDQ5Ra.jpg",
  spanakopita:
    "https://as1.ftcdn.net/v2/jpg/17/61/92/28/1000_F_1761922881_wzbHRSHQ35GlLDF4fZNVQNLDzmq5AOqb.jpg",

  // === GERMAN ===
  schnitzel:
    "https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=800",
  bratwurst: "https://as2.ftcdn.net/v2/jpg/13/77/95/45/1000_F_1377954538_1BpEcUDv0jTfuzoYe4xOMf1K79mw9oqP.jpg",
  sauerbraten:
    "https://as2.ftcdn.net/v2/jpg/18/54/56/83/1000_F_1854568361_MVHwc5Qr37fYfjhGanopuJvkda41CF2J.jpg",

  // === BRITISH ===
  "fish-and-chips":
    "https://images.unsplash.com/photo-1579208030886-b1bbc6eb86d1?w=800",
  "fish-chips":
    "https://images.unsplash.com/photo-1579208030886-b1bbc6eb86d1?w=800",
  "beef-wellington":
    "https://images.unsplash.com/photo-1544025162-d76d9ec51ffd?w=800",
  "shepherds-pie":
    "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800",
  "bangers-mash":
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  "scotch-eggs":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
  "fish-pie-nz":
    "https://as2.ftcdn.net/v2/jpg/08/86/00/55/1000_F_886005536_dcRy96gBIEo1F74vnrcKKncUXYijYISB.jpg",
  "yorkshire-pudding":
    "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800",

  // === EASTERN EUROPEAN ===
  borscht: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
  pierogi: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800",
  pelmeni: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800",
  vareniki:
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800",
  goulash: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
  "beef-stroganoff":
    "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800",

  // === SCANDINAVIAN ===
  "swedish-meatballs":
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
  frikadeller:
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",

  // === SWISS/DUTCH ===
  rosti: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800",
  stamppot:
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800",

  // === MIDDLE EASTERN ===
  hummus: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800",
  falafel:
    "https://as1.ftcdn.net/v2/jpg/15/21/23/94/1000_F_1521239436_jvI3GXVehC6giE1jy6k7qOdzhlDlnyqy.jpg",
  shawarma:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
  tabbouleh:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  kebab: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800",
  dolma: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800",
  shakshuka:
    "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800",

  // === AFRICAN ===
  "jollof-rice":
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
  tagine: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800",
  injera:
    "https://as2.ftcdn.net/v2/jpg/15/54/26/95/1000_F_1554269527_pxukVXBqLXXazhyUUxgXAivJqNVewDZp.jpg",
  bobotie:
    "https://as1.ftcdn.net/v2/jpg/15/45/66/62/1000_F_1545666217_LJFXp3xegIjHlSbY7LlglhhW9ga50J1y.jpg",
  "bunny-chow":
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
  suya: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  "egusi-soup":
    "https://as2.ftcdn.net/v2/jpg/17/52/46/53/1000_F_1752465351_SQJSuEja56UjIdLgQo36P6ZIWJHRvbVA.jpg",
  "peri-peri-chicken":
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800",
  koshari:
    "https://as2.ftcdn.net/v2/jpg/16/57/62/95/1000_F_1657629508_1IQBgGh442lrPUhaqzeZ0IUkxQwSfq9X.jpg",
  harira:
    "https://as2.ftcdn.net/v2/jpg/18/44/34/41/1000_F_1844344131_MvwkaUb8UclOmqJOPxPId92hTM0nGJrT.jpg",
  biltong:
    "https://as1.ftcdn.net/v2/jpg/08/53/26/08/1000_F_853260875_fcIMj1oDOI5aedg3SjmMFCEEWTEZmvse.jpg",
  chakalaka:
    "https://as1.ftcdn.net/v2/jpg/06/05/74/14/1000_F_605741467_pN720U2ZxABKa6St0VlCf4I38oeJwThs.jpg",
  "malva-pudding":
    "https://as1.ftcdn.net/v2/jpg/06/99/62/76/1000_F_699627613_qw4tltxew6v8Xzyybl9TCTp35gPOWgJ9.jpg",
  "couscous-royale":
    "https://as1.ftcdn.net/v2/jpg/04/98/04/34/1000_F_498043493_lIaX7ndK1nwVq3b0Goahz2xumXe3911H.jpg",
  pastilla:
    "https://cdn.pixabay.com/photo/2017/01/11/00/55/vol-au-vent-1970629_1280.jpg",
  msemen:
    "https://as1.ftcdn.net/v2/jpg/18/28/83/82/1000_F_1828838243_GxaqNLZBGksFKDuSRIz2DXkrXKtuXCDU.jpg",
  rfissa:
    "https://as1.ftcdn.net/v2/jpg/05/74/65/96/1000_F_574659638_n1hmiDFksmX9vb2rdLHuHps5bZ2i3XvW.jpg",
  "chermoula-fish":
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
  brik: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
  lablabi: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
  molokhia:
    "https://as1.ftcdn.net/v2/jpg/17/48/37/72/1000_F_1748377283_zeQ0TIbTYnFJZfJraa34hCovZxm4fkuX.jpg",
  "ful-medames":
    "https://as1.ftcdn.net/v2/jpg/18/36/65/50/1000_F_1836655049_efPxmMlVxbNyGHPFBP6K3Xg4c7lNYc36.jpg",
  fufu: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
  "fufu-soup":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
  maafe: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
  thieboudienne:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  akara:
    "https://as2.ftcdn.net/v2/jpg/05/77/84/53/1000_F_577845306_27usQQdAYc4F5QeDvjBBko9p91r91FA8.jpg",
  "moin-moin":
    "https://as2.ftcdn.net/v2/jpg/12/35/27/65/1000_F_1235276577_krRLaQMS8Em30LjIH241ZNsnylqjP7CF.jpg",
  "puff-puff":
    "https://as1.ftcdn.net/v2/jpg/11/90/77/66/1000_F_1190776694_y7ZPPMhLL0woZOw46LcT8jPIJfKiMRfc.jpg",
  mandazi: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
  ugali: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
  "sukuma-wiki":
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  "nyama-choma":
    "https://images.unsplash.com/photo-1558030006-450675393462?w=800",
  pilau: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  "wali-wa-nazi":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  kitfo:
    "https://as1.ftcdn.net/v2/jpg/17/76/15/62/1000_F_1776156266_z4tHQWjCEqXzOyyLbbnhQwccyIloWg3B.jpg",
  tibs: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800",
  shiro:
    "https://as2.ftcdn.net/v2/jpg/06/60/93/77/1000_F_660937705_vU9MVzAs47lrXFQZYAy8OZfoBEoxHVZV.jpg",
  kenkey: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
  "yassa-chicken":
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800",

  // === MEXICAN ===
  tacos: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
  mole: "https://as1.ftcdn.net/v2/jpg/18/50/24/44/1000_F_1850244469_jOFa3GfTxPkgsA2Q4Od0Y0ovplsr65dl.jpg",
  "mole-poblano":
    "https://as2.ftcdn.net/v2/jpg/18/47/03/23/1000_F_1847032314_VlDweHdRwzsvQNaztDJXKQoBxaq9UoSg.jpg",
  enchiladas:
    "https://as1.ftcdn.net/v2/jpg/18/62/35/24/1000_F_1862352479_H3RxFVz6PL6c7HbN0OmKaJ1xxCoxp0Pr.jpg",
  guacamole:
    "https://as2.ftcdn.net/v2/jpg/17/15/14/69/1000_F_1715146913_yyZNkw45jAJqHDszkcbJXBRvDQm63NbG.jpg",
  pozole:
    "https://as1.ftcdn.net/v2/jpg/11/48/62/20/1000_F_1148622051_1dfPRw2mHY4oluhhmMriIRyJMIxOokMS.jpg",
  chilaquiles:
    "https://as2.ftcdn.net/v2/jpg/17/38/05/51/1000_F_1738055166_KoVViY547c3EiFiMPsRT1JVDQGbzoFAz.jpg",
  elote:
    "https://as2.ftcdn.net/v2/jpg/15/97/73/75/1000_F_1597737566_fK8ccuhk6i3aA602hiMxaDREtLzTCK3L.jpg",

  // === BRAZILIAN ===
  feijoada: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=800",
  picanha:
    "https://as2.ftcdn.net/v2/jpg/12/72/55/19/1000_F_1272551911_s8wAdPoib9R8MS958l0qrdQB9GIGk0Il.jpg",
  coxinha:
    "https://as2.ftcdn.net/v2/jpg/17/43/69/27/1000_F_1743692767_BnfKbN9J9DZl8DFIRpyFoGMFHzx5R99N.jpg",
  "pao-de-queijo":
    "https://as1.ftcdn.net/v2/jpg/16/07/41/80/1000_F_1607418031_b1KCEjYhT8fLmSyXiJtQK4lTkQLsKAV5.jpg",
  moqueca:
    "https://as2.ftcdn.net/v2/jpg/18/50/13/23/1000_F_1850132352_ZiU7Sks6uRpBIQ54ONuK4vCzZWhRtw1K.jpg",

  // === PERUVIAN ===
  ceviche:
    "https://as2.ftcdn.net/v2/jpg/18/41/63/47/1000_F_1841634758_Ta41u8kbz9RavgRaJHZPkdsWq4YMZp4W.jpg",
  "lomo-saltado":
    "https://as2.ftcdn.net/v2/jpg/18/58/47/51/1000_F_1858475155_E9qLeOqjeZCRg6WXUx03XCoKdazrkdQX.jpg",
  "aji-de-gallina":
    "https://as2.ftcdn.net/v2/jpg/16/80/27/09/1000_F_1680270902_ZQWKX9RMG9Bi9niEsVxJTMdfLarUWK2t.jpg",

  // === ARGENTINE ===
  asado:
    "https://as1.ftcdn.net/v2/jpg/18/02/20/54/1000_F_1802205495_rZg1LNeUsBQKi3ZWJMmsCF4NHFkrTNg6.jpg",
  empanadas:
    "https://as2.ftcdn.net/v2/jpg/12/56/69/39/1000_F_1256693923_WnmoaFkLZH6LV8xRNlNW0cIFvF5dNzJB.jpg",
  "dulce-de-leche":
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",

  // === CARIBBEAN ===
  "jerk-chicken":
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800",
  "rice-and-peas":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  "ackee-saltfish":
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
  "ropa-vieja":
    "https://images.unsplash.com/photo-1544025162-d76d9ec51ffd?w=800",
  mofongo: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800",
  "gallo-pinto":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  pupusas: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=800",

  // === AMERICAN ===
  "bbq-ribs":
    "https://as1.ftcdn.net/v2/jpg/17/92/66/42/1000_F_1792664241_v5ziKai44l8YRBxtvqUyBhVxN9Yk6igw.jpg",
  "mac-cheese":
    "https://as1.ftcdn.net/v2/jpg/15/77/44/50/1000_F_1577445019_wsObHDFh0QKgVKqhX7b6AtGC0kS24Njb.jpg",
  "fried-chicken":
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
  "lobster-roll":
    "https://as1.ftcdn.net/v2/jpg/16/91/95/74/1000_F_1691957420_mVwuPjmDBPtHv71LQYB9XTbaFj7ydG7D.jpg",
  "clam-chowder":
    "https://as2.ftcdn.net/v2/jpg/15/80/48/63/1000_F_1580486394_ZEeHrrAXPFEE7a2WiHyoXAdqjQ9Q9pX4.jpg",
  "buffalo-wings":
    "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800",
  pancakes:
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
  "grilled-cheese":
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
  "chili-con-carne":
    "https://as1.ftcdn.net/v2/jpg/17/33/77/62/1000_F_1733776255_O5eptV4s0NeOf9U2dxVqKmfLcH2FyeT7.jpg",
  gumbo:
    "https://as1.ftcdn.net/v2/jpg/16/70/71/22/1000_F_1670712217_gZ8v2nqy2KHR7AxeWPoTOHS7zCne5rR7.jpg",
  jambalaya:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
  "key-lime-pie":
    "https://images.unsplash.com/photo-1562007908-17c67e878c88?w=800",
  "tres-leches":
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",

  // === CANADIAN ===
  poutine:
    "https://as2.ftcdn.net/v2/jpg/18/52/88/69/1000_F_1852886901_NNJj7PnNlNKYrNkh9LLgKQQjL7MhycbK.jpg",
  "butter-tarts":
    "https://as2.ftcdn.net/v2/jpg/13/52/79/79/1000_F_1352797972_uN72LbCghn1HWv6joiJn2McxMpAjOLe0.jpg",

  // === VENEZUELAN/COLOMBIAN ===
  arepas: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800",

  // === AUSTRALIAN ===
  "meat-pie":
    "https://as1.ftcdn.net/v2/jpg/17/62/19/00/1000_F_1762190075_MJkqU7J1IILdc80W8ae9Ev5CoZThNYZF.jpg",
  "meat-pie-aus":
    "https://as1.ftcdn.net/v2/jpg/18/56/16/62/1000_F_1856166213_SgSap8eTXdpHIkfRLZ4T4ZfCcLPzcKUE.jpg",
  "meat-pies":
    "https://as1.ftcdn.net/v2/jpg/17/62/19/00/1000_F_1762190075_MJkqU7J1IILdc80W8ae9Ev5CoZThNYZF.jpg",
  lamington:
    "https://as2.ftcdn.net/v2/jpg/18/28/17/81/1000_F_1828178162_4i038fmNHuvYxewy1CxZOVhJZbZinxK6.jpg",
  lamingtons:
    "https://as2.ftcdn.net/v2/jpg/18/28/17/81/1000_F_1828178162_4i038fmNHuvYxewy1CxZOVhJZbZinxK6.jpg",
  "vegemite-toast":
    "https://as2.ftcdn.net/v2/jpg/17/40/43/87/1000_F_1740438764_owbews44vTdLVNf7Cq4VOuR18Bc6H1eH.jpg",
  barramundi:
    "https://as1.ftcdn.net/v2/jpg/12/38/93/36/1000_F_1238933646_wdidM8u7v7TSZx4Egj1eRcsXfsURp6bS.jpg",
  "anzac-biscuits":
    "https://as1.ftcdn.net/v2/jpg/01/09/56/96/1000_F_109569640_9Y8HtYmUUQPKSE9K6NrDiKiXwLfVwGtw.jpg",
  damper:
    "https://as1.ftcdn.net/v2/jpg/14/56/38/54/1000_F_1456385415_Ry9yFUUIVydOslPorHMq8dEB2u3xKaWR.jpg",
  "fairy-bread":
    "https://as2.ftcdn.net/v2/jpg/14/11/04/21/1000_F_1411042129_Zpy9eldyBszzcZgaOajvd2RNRDjriHso.jpg",
  "kangaroo-steak":
    "https://as1.ftcdn.net/v2/jpg/18/24/77/32/1000_F_1824773256_QoAoxoqA59pdjdDRUY6Z6VAbiVIzeqw5.jpg",
  "chiko-roll":
    "https://as1.ftcdn.net/v2/jpg/13/06/46/18/1000_F_1306461851_Rrc53HAQmrIY0EGXGwEtuVJmXlm6FRDw.jpg",
  "emu-steak":
    "https://as1.ftcdn.net/v2/jpg/07/66/56/82/1000_F_766568223_X3fz3W7Lt6FhNGzcCOcN9TDC9fLJjcar.jpg",
  "crocodile-satay":
    "https://as2.ftcdn.net/v2/jpg/14/88/98/25/1000_F_1488982565_QZ4N2LKX77azGVlTeFB4Vcd2jyHAOXkW.jpg",

  // === NEW ZEALAND ===
  pavlova:
    "https://as1.ftcdn.net/v2/jpg/17/86/31/48/1000_F_1786314898_WqwL5XCcomDzNcd3mNEdeLZWATJw9J3h.jpg",
  hangi:
    "https://as2.ftcdn.net/v2/jpg/17/16/95/03/1000_F_1716950346_OHAiqTlSduIjYbek1UN8LTGsC5b8lOJd.jpg",
  "hokey-pokey":
    "https://as1.ftcdn.net/v2/jpg/13/57/79/08/1000_F_1357790844_F1vTQ97tjEmougL8uOjkfLLWAVXEa0Xg.jpg",
  "whitebait-fritters":
    "https://as1.ftcdn.net/v2/jpg/06/14/69/02/1000_F_614690224_PEhH1wtSTxKboQwDhsSjqhCMCu7N3l62.jpg",
  "lolly-cake":
    "https://as1.ftcdn.net/v2/jpg/18/56/21/80/1000_F_1856218014_JAjanFC8UHWBKdnbM3vPtpVwHeXlIVp6.jpg",
  "fish-n-chips-nz":
    "https://as1.ftcdn.net/v2/jpg/18/36/71/32/1000_F_1836713286_fsIJKKKFnpckHEA3tonU8wySU9zMCfCD.jpg",
  "roast-lamb-nz":
    "https://as2.ftcdn.net/v2/jpg/15/26/72/73/1000_F_1526727329_5V5AcitXZ7NVWtSKDv22taembZBleKXr.jpg",
  rewena:
    "https://as1.ftcdn.net/v2/jpg/12/07/63/68/1000_F_1207636837_N0RoVY345eNnZ1K3tM3klZ7pgdcDotZu.jpg",
  "boil-up":
    "https://as2.ftcdn.net/v2/jpg/18/57/48/21/1000_F_1857482159_k2NfnXsAr7hWFkhsLPI0AKlIZ0yrE5wl.jpg",
  afghans:
    "https://as1.ftcdn.net/v2/jpg/11/92/83/34/1000_F_1192833432_Mtd3tgx1YyWzekpn5H7OGsMCwK459TyV.jpg",
  "kiwi-fish-pie":
    "https://as2.ftcdn.net/v2/jpg/08/86/00/55/1000_F_886005536_dcRy96gBIEo1F74vnrcKKncUXYijYISB.jpg",

  // === PACIFIC ISLANDS (FIJI, HAWAII, SAMOA, TONGA) ===
  kokoda:
    "https://as1.ftcdn.net/v2/jpg/16/03/28/64/1000_F_1603286420_9zS739EgvCSdXlLXo074QdpbTOrYrTAX.jpg",
  lovo: "https://as1.ftcdn.net/v2/jpg/10/04/49/66/1000_F_1004496631_CfOONeSLHsiB2RHnGQP80b7qzdgnRVdO.jpg",
  palusami:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  kava: "https://as1.ftcdn.net/v2/jpg/16/09/28/18/1000_F_1609281820_Xu1YRMxlQ7tMNJn9MxBYJBq3m0R5an9H.jpg",
  umu: "https://images.unsplash.com/photo-1544025162-d76d9ec51ffd?w=800",
  oka: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800",
  "lu-pulu":
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  poke: "https://as1.ftcdn.net/v2/jpg/16/32/42/28/1000_F_1632422863_E63CiKG86XJEP4d6uaMcUKHBAjCChtEt.jpg",
  "loco-moco":
    "https://as1.ftcdn.net/v2/jpg/14/91/10/46/1000_F_1491104682_ttphKeHeoTwLxvXrFWIIWqFFTkTxMueU.jpg",
  "kalua-pig":
    "https://as1.ftcdn.net/v2/jpg/08/56/66/08/1000_F_856660802_2bE4uGlmlipUHXZQO3kM5KduTQRWB6W7.jpg",
  poi: "https://as2.ftcdn.net/v2/jpg/17/57/83/97/1000_F_1757839780_ptnE2tYkt1asgXY3r9EsaAEm9BgoFDFP.jpg",
  haupia:
    "https://as1.ftcdn.net/v2/jpg/11/46/97/04/1000_F_1146970456_T28PcpqZBEwNlBTm9lupODDZks7juswU.jpg",
  laulau:
    "https://as2.ftcdn.net/v2/jpg/11/48/69/09/1000_F_1148690936_XSIrAOpJctlKvMxPqmMStDBtIG9Uco4U.jpg",
  "spam-musubi":
    "https://as1.ftcdn.net/v2/jpg/09/94/72/82/1000_F_994728239_5flzMbvJiBARUMQ12FPxlcHhmg9tx13G.jpg",
  "poisson-cru":
    "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800",
  panipopo:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",

  // === PORTUGUESE ===
  "caldo-verde":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
};

export function getRecipeImage(recipeId: string): string {
  const image = foodImages[recipeId];
  if (!image) {
    console.error(`Missing image for recipe: ${recipeId}`);
    throw new Error(`No image found for recipe ID: ${recipeId}`);
  }
  return image;
}
