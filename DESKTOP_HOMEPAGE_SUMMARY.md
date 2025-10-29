# ملخص تفصيلي لصفحة الـ Home Page - نسخة الديسكتوب

## 📋 نظرة عامة على ترتيب الصفحة

الصفحة بتتكون من المكونات دي بالترتيب:

1. **Header** - الهيدر
2. **Hero Section** - القسم الرئيسي
3. **Our Services** - خدماتنا
4. **About App** - عن التطبيق
5. **Boat Fleet** - أسطول القوارب
6. **Why Choosing Us** - ليه تختارنا
7. **Stats** - الإحصائيات
8. **Activities** - الأنشطة
9. **Destinations** - الوجهات
10. **Final CTA** - الدعوة النهائية للحجز
11. **Footer** - الفوتر

---

## 1️⃣ Header - الهيدر

### الشريط العلوي (Top Bar):
```css
Height: 56px (h-14)
Background: #093B77
Display: مخفي على الموبايل، ظاهر من sm فما فوق
Padding: px-8 md:px-16
```

**محتويات الجانب الأيسر:**
- 📞 Phone: +2010 31 41 6 900 (مع أيقونة)
- 📧 Email: info@marakbi.tours (مع أيقونة)

**محتويات الجانب الأيمن:**
- نص "List your Boat"
- أيقونات التواصل الاجتماعي (Facebook, LinkedIn, Instagram, YouTube)

**الحركات:**
- Hover على الروابط: `hover:text-orange-300`
- Hover على الأيقونات: `hover:opacity-80`

### شريط التنقل الرئيسي (Main Nav):

**الموقع:**
```css
Position: absolute
Top: 0 على الموبايل، top-14 على الديسكتوب
Z-index: 50
Background: transparent (على الهوم) أو white (على الصفحات الأخرى)
```

**الروابط:**
- Home
- About us
- Our Services (Dropdown menu)
- Contact
- Search Icon (بيفتح input متحرك)

**الـ Search Feature (Desktop):**
- عند الضغط على أيقونة البحث، بيظهر input field بحركة انزلاقية
- Width: من 0 لـ w-64 مع transition
- بيظهر suggestions dropdown تحت الـ input
- الـ Suggestions: 8 نتائج كحد أقصى
- Support للبحث بالعربي والإنجليزي مع normalization

**الحركات:**
```css
Text Hover: hover:text-blue-200 (على transparent) أو hover:text-blue-600 (على solid)
Search Input: transition-all duration-300 ease-out
Suggestions: transition-opacity duration-200
```

**Auth Section:**
- لو User مسجل: My Profile, Dashboard, Logout Button
- لو مش مسجل: Register, Login
- Logout Button: بيظهر spinner أثناء تسجيل الخروج

---

## 2️⃣ Hero Section - القسم الرئيسي

### خلفية متحركة (Animated Background):

**الصور (3 صور بتتبدل تلقائي):**
```javascript
backgroundImages = [
  "/images/Rectangle 3463841.png", // Felucca
  "/images/Rectangle 3463845.png", // Fishing
  "/images/Rectangle 3463846.png"  // Kayak
]
```

**الحركة:**
- بتتبدل كل 5 ثواني (5000ms)
- Transition: `transition-all duration-1000 ease-in-out`
- الصورة بتعمل smooth fade transition

### تقسيم القسم:

**الجانب الأيسر - المحتوى النصي:**

```css
Display: flex flex-col
Alignment: text-left
```

**النصوص:**
1. **"With Marakbi"**
   - Color: text-orange-300
   - Font: SignPainter
   - Size: lg:text-4xl
   - Style: capitalize

2. **"Your Dream Boats"**
   - Color: text-white
   - Font: Poppins
   - Size: lg:text-3xl
   - Weight: font-medium
   - Margin: mb-4 sm:mb-6

3. **العنوان الرئيسي:**
   ```
   "Most Reliable
   Luxury Boats Rentals" (Rentals بلون برتقالي)
   ```
   - Color: text-white + text-orange-300 (للكلمة الأخيرة)
   - Font: Poppins
   - Size: lg:text-6xl
   - Weight: font-bold
   - Line Height: lg:leading-[68px]
   - Margin: mb-6 sm:mb-12 lg:mb-16

4. **زر "Explore Now":**
   ```css
   Width: w-56
   Height: h-12
   Background: #0C4A8C
   Border Radius: rounded-lg
   Color: white
   Hover: hover:bg-[#0A3D7A]
   Transition: transition-colors
   Display: مخفي على الموبايل (hidden sm:flex)
   ```

**الجانب الأيمن - نموذج الحجز:**

```css
Width: sm:w-80 (320px)
Background: bg-white/20 backdrop-blur-md
Border Radius: rounded-2xl
Padding: p-5 sm:p-6
Shadow: shadow-2xl
Border: border border-white/30
Space: space-y-3 sm:space-y-4
```

**عناصر النموذج (3 Dropdowns + Button):**

1. **City Dropdown:**
   - Label: "Where To Go"
   - Options: Aswan, Luxor, Cairo, Alexandria, Hurghada, Sharm El Sheikh

2. **Boat Type Dropdown:**
   - Label: "Boat Type"
   - Options: Traditional Felucca, Luxury Yacht, Speed Boat, Fishing Boat, Party Boat, Family Boat

3. **Trip Type Dropdown:**
   - Label: "Trip Type"
   - Options: Per Hour, Half Day, Full Day, Multi Day

**تصميم الـ Dropdowns:**
```css
Height: sm:h-12
Padding: p-3
Background: bg-white/30 backdrop-blur-sm
Border Radius: rounded-lg
Border: border-white/20
Focus: focus:outline-none focus:ring-2 focus:ring-white/50
```

**زر "Book now":**
```css
Width: w-full
Height: sm:h-12
Background: #0C4A8C
Border Radius: rounded-lg
Color: white
Font Weight: font-medium
Hover: hover:bg-[#0A3D7A]
Transition: transition-all duration-300
Shadow: shadow-lg
Margin Top: mt-2 sm:mt-4
```

### Featured Activities Section (أسفل الـ Hero):

**الموقع والتصميم:**
```css
Position: absolute bottom-0 left-1/2
Transform: transform -translate-x-1/2
Width: max-w-5xl w-[600px]
Background: white
Border Radius: rounded-tl-lg rounded-tr-lg (مقوس من فوق فقط)
Shadow: shadow-lg
Padding: p-4
Min Height: min-h-[200px]
Display: مخفي على الموبايل (hidden sm:block)
```

**العنوان:**
```css
Text: "Featured Activities"
Color: text-blue-700
Size: text-lg
Font Weight: font-medium
Margin Bottom: mb-4
```

**معرض الصور (3 صور):**

الصور:
```javascript
"/images/f1.png" // Felucca - Badge: 01
"/images/f2.png" // Fishing - Badge: 02
"/images/f3.png" // Kayak - Badge: 03
```

**تصميم كل صورة:**
- Width & Height: w-44 h-40 (للصورة النشطة) أو w-40 h-36 (للصور الأخرى)
- Border Radius: rounded-lg
- Transition: `transition-all duration-500 ease-in-out`
- Hover: `hover:scale-110`
- Scale: `scale-105` (للصورة النشطة)

**الـ Badge (الرقم على الصورة):**
```css
Position: absolute top-4 left-4
Width & Height: w-8 h-8
Background: bg-black/30
Border Radius: rounded-full
Color: white
Font Size: text-lg
Font Weight: font-medium
```

**الحركات:**
1. **تبديل تلقائي:** الصور بتتبدل كل 5 ثواني مع الخلفية
2. **Click:** لما تضغط على صورة، بتتغير الخلفية للصورة دي
3. **الصورة النشطة:** بتكبر شوية (scale-105) وأبعادها أكبر

---

## 3️⃣ Our Services - خدماتنا

### التصميم العام:
```css
Padding: py-8 sm:py-20
Background: white
Max Width: max-w-7xl
Margin: mx-auto
Padding X: px-4 sm:px-6 lg:px-8
```

### الـ Header Section:

**العنوان الفرعي:**
```css
Text: "What Do We Offer"
Color: #927C4E
Font: SignPainter
Size: lg:text-5xl
Margin Bottom: mb-2 sm:mb-4
Alignment: text-center
```

**العنوان الرئيسي:**
```css
Text: "Our Services"
Color: black
Font: Poppins
Size: lg:text-6xl
Weight: font-bold
Margin Bottom: mb-4 sm:mb-6
```

**الوصف:**
```css
Text: "No Matter The Journey, We Have A Boat For Your Story..."
Color: text-gray-400
Size: text-base sm:text-xl
Max Width: max-w-4xl
Alignment: mx-auto
Line Height: leading-relaxed
```

### الـ Services Grid:

**التخطيط:**
```css
Display: grid
Columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap: gap-6 sm:gap-8
```

**الخدمات (6 خدمات):**

1. **Private Boat**
   - Icon: `/icons/Frame 42.svg`
   - Description: "Rent Your Own Exclusive Boat..."

2. **Sharing Boat**
   - Icon: `/icons/Frame 37.svg`
   - Description: "Join A Social, Guided Trip..."

3. **Travel Boat**
   - Icon: `/icons/boat-helm-svgrepo-com 1.svg`
   - Description: "Find A Unique Floating Home..."

4. **Fishing Boat**
   - Icon: `/icons/Frame 1321316342.svg`
   - Description: "Get Out And Catch More..."

5. **Occasion**
   - Icon: `/icons/Gift.svg`
   - Description: "Make Your Event Truly Special..."

6. **Water Sports**
   - Icon: `/icons/Wakeboarding.svg`
   - Description: "Get Your Adrenaline Fix..."

### تصميم كل Service Card:

**الـ Container:**
```css
Background: white
Border Radius: rounded-lg
Shadow: shadow-lg
Border Left: border-l-4 border-l-[#CEAF6E]
Padding: p-5 sm:p-6
Hover: hover:shadow-xl
Transition: transition-shadow duration-300
```

**الأيقونة:**
```css
Width & Height: w-12 h-12 sm:w-16 sm:h-16
Margin Bottom: mb-3 sm:mb-4
```

**العنوان:**
```css
Color: #093B77
Size: text-lg sm:text-xl
Weight: font-medium
Font: Poppins
Margin Bottom: mb-2 sm:mb-3
```

**الخط المتموج (Wavy Underline):**
```css
Image: /icons/Line 74.svg
Height: h-3 sm:h-4
Margin Bottom: mb-3 sm:mb-4
```

**الوصف:**
```css
Color: #072D5B
Size: text-sm sm:text-base
Font: Poppins
Line Height: leading-relaxed
Margin Bottom: mb-4 sm:mb-6
```

**الزر:**
```css
Background: #093B77
Color: white
Padding: px-6 py-2.5 sm:px-8 sm:py-3
Size: text-sm sm:text-base
Border Radius: rounded-lg
Hover: hover:bg-[#0A3D7A]
Transition: transition-colors duration-300
Width: w-full sm:w-auto
```

---

## 4️⃣ About App - عن التطبيق

### التصميم العام:
```css
Padding: py-8 sm:py-20
```

### الـ Header:

**نفس تصميم الـ Services Header:**
- عنوان فرعي: "What is Marakbi"
- عنوان رئيسي: "About us"
- وصف: "Discover the soul of Egypt's waters..."

### المحتوى (Grid Layout):

```css
Display: grid
Columns: grid-cols-1 lg:grid-cols-2
Gap: gap-8 sm:gap-12
Alignment: items-start
```

### الجانب الأيسر - النص:

**العنوان:**
```css
Text: "Providing a large fleet of Boats for a perfect and dreamy experience"
Color: #072D5B
Size: text-3xl sm:text-4xl lg:text-5xl
Weight: font-semibold
Font: Poppins
Margin Bottom: mb-6 sm:mb-8
Line Height: leading-tight
```

**الفقرة:**
```css
Text: "Born in Aswan, Marakbi offers..."
Color: #093B77
Size: text-base sm:text-lg
Font: Poppins
Line Height: leading-7 sm:leading-9
Margin Bottom: mb-6 sm:mb-8
```

**قائمة المميزات (5 عناصر مع أيقونة ✓):**

```css
Space: space-y-2 sm:space-y-3
```

كل عنصر:
```css
Display: flex items-start
Icon: /icons/tick.svg (w-5 h-5 sm:w-6 sm:h-6)
Icon Margin: mr-3 mt-1
Text Color: #093B77
Text Size: text-base sm:text-lg
Text Weight: font-semibold
Line Height: leading-7 sm:leading-9
```

العناصر:
- Premium Boats & Yachts
- Our Professional Approach
- AR/VR Experience
- 360 Video Experience
- AI Chatbot

**زر App Store:**
```css
Image: /images/image 2.png
Size: w-40 h-9 sm:w-52 sm:h-11
Margin Top: mt-6 sm:mt-8
```

**النص أسفل الزر:**
```css
Text: "CTO & Founder, Marakbi App"
Color: black
Size: text-xs sm:text-sm
Padding: pl-3 sm:pl-4
Line Height: leading-6 sm:leading-9
```

### الجانب الأيمن - الصورة:

```css
Display: flex justify-center lg:justify-end
Image: /images/image 1.png
Width: w-full max-w-md sm:max-w-lg lg:w-[640px]
Height: lg:h-[661px]
Object Fit: object-cover
Border Radius: rounded-lg
Margin Top: mt-6 lg:mt-0
```

---

## 5️⃣ Boat Fleet - أسطول القوارب

### التصميم العام:

**الـ Background:**
```css
Position: relative
Overflow: hidden
Padding: py-16
Background Image: url('/images/Frame 1321316346.png')
Background: bg-cover bg-center bg-no-repeat
Height: h-110
Position: absolute inset-0
```

### الـ Hero Content:

**العنوان:**
```css
Text: "Fleet of Luxury Boats"
Color: white
Size: text-3xl md:text-5xl
Weight: font-semibold
Font: Poppins
Margin Bottom: mb-4
Margin Top: mt-4
Alignment: text-center
```

**الخط المتموج (Desktop فقط):**
```css
Display: hidden md:flex
Image: /icons/Line 74.svg
Height: h-4
Margin Bottom: mb-0 (بعد الوصف)
```

**الوصف:**
```css
Text: "Explore our exquisite collection..."
Color: white
Size: text-s
Font: Poppins
Max Width: max-w-4xl
Line Height: leading-relaxed
Padding: px-4
Margin Bottom: mb-6
Alignment: text-center
```

### الـ Boats Grid:

**التخطيط:**
```css
Display: grid
Columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap: gap-6
Max Width: max-w-6xl
Margin: mx-auto mb-12
Padding: px-4
Place Items: place-items-center md:place-items-stretch
```

**القوارب (6 قوارب):**

1. **Luxury Yacht**
   - Image: `/images/Rectangle 3463853.png`
   - Price: 500 EGP/Hour
   - Location: Aswan - Egypt
   - Guests: 8
   - Rooms: 4
   - Rating: 4.8 (24 reviews)

2. **Traditional Felucca**
   - Image: `/images/Rectangle 3463855.png`
   - Price: 200 EGP/Hour
   - Location: Aswan - Egypt
   - Guests: 6
   - Rooms: 2
   - Rating: 4.5 (18 reviews)

3. **Speed Boat**
   - Image: `/images/Rectangle 3463856.png`
   - Price: 300 EGP/Hour
   - Location: Aswan - Egypt
   - Guests: 4
   - Rooms: 2
   - Rating: 4.7 (31 reviews)

4. **Fishing Boat**
   - Image: `/images/Rectangle 3463853.png`
   - Price: 150 EGP/Hour
   - Location: Luxor - Egypt
   - Guests: 4
   - Rooms: 2
   - Rating: 4.2 (12 reviews)

5. **Party Boat**
   - Image: `/images/Rectangle 3463855.png`
   - Price: 400 EGP/Hour
   - Location: Cairo - Egypt
   - Guests: 12
   - Rooms: 6
   - Rating: 4.9 (45 reviews)

6. **Family Boat**
   - Image: `/images/Rectangle 3463856.png`
   - Price: 250 EGP/Hour
   - Location: Alexandria - Egypt
   - Guests: 6
   - Rooms: 3
   - Rating: 4.6 (28 reviews)

### تصميم الـ Boat Card:

**الـ Container:**
```css
Width: w-96 (384px)
Height: h-[465px]
Background: white
Border Radius: rounded-2xl
Shadow: shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
Overflow: hidden
```

**الصورة:**
```css
Position: relative
Width: w-full
Height: h-64 (256px)
Object Fit: object-cover
Border Radius: rounded-lg
```

**الـ Rating Overlay (على الصورة):**
```css
Position: absolute top-1 right-1
Background: white
Border Radius: rounded-tr-lg rounded-bl-lg
Padding: px-3 py-2
Display: flex items-center gap-2
Shadow: shadow-lg
```

**محتويات الـ Rating:**
- 5 نجوم (الممتلئ منهم حسب الـ rating)
- النجمة: `/icons/Star Icon.svg` (w-4 h-4)
- النجوم الممتلئة: `opacity-100`
- النجوم الفاضية: `opacity-30`
- الرقم: `{rating.toFixed(1)}` (text-sm font-medium)
- عدد المراجعات: `({reviewsCount})` (text-xs)
- أيقونة الإعجاب: `/icons/thumb_up.svg`
  - Hover: `hover:bg-orange-500`

**محتوى الكارد (Padding: p-6):**

1. **اسم القارب:**
   ```css
   Color: black
   Size: text-xl
   Weight: font-semibold
   Alignment: text-center
   Margin Bottom: mb-2
   ```

2. **الخط المتموج:**
   ```css
   Image: /icons/Line 74.svg
   Width: w-15
   Padding Top: pt-1
   Margin Bottom: mb-4
   Alignment: justify-center
   ```

3. **الصف الأول (Location + Price):**
   ```css
   Display: flex justify-between items-center
   Margin Bottom: mb-4
   ```

   **الموقع:**
   - Icon: `/icons/location_on.svg` (w-6 h-6)
   - Text: "Aswan - Egypt"
   - Size: text-base

   **السعر:**
   - Number: text-2xl font-medium (color: #072D5B)
   - Currency: "EGP" (text-sm)
   - Period: "/Hour" (text-sm)

4. **خط فاصل:**
   ```css
   Width: w-full
   Height: h-px
   Background: bg-stone-300
   Margin Bottom: mb-4
   ```

5. **الصف الثاني (Amenities):**
   ```css
   Display: flex justify-between items-center
   ```

   **Guests:**
   - Icon: `/icons/groups_2.svg` (w-7 h-6)
   - Text: "{guests} Guest"

   **Status:**
   - Icon: `/icons/award_meal.svg` (w-7 h-6)
   - Text: "available"

   **Rooms:**
   - Icon: `/icons/bed.svg` (w-7 h-6)
   - Text: "{rooms} Rooms"

### زر "View All Boats":

```css
Width: w-full max-w-md sm:w-auto sm:min-w-[280px]
Height: h-12
Padding: px-8 py-2.5
Background: #0C4A8C
Border Radius: rounded-lg
Color: white
Size: text-base
Hover: hover:bg-[#0A3D7A]
Transition: transition-colors
Display: inline-flex justify-center items-center
Alignment: text-center
```

---

## 6️⃣ Why Choosing Us - ليه تختارنا

### الـ Header Section:

```css
Background: #093B77
Padding: py-8 sm:py-16
Alignment: text-center
Max Width: max-w-4xl mx-auto
Padding X: px-4
```

**العنوان:**
```css
Text: "Why Choosing US"
Color: white
Size: lg:text-[46px]
Weight: font-bold
Font: Poppins
Margin Bottom: mb-3 sm:mb-4
Text Transform: capitalize
```

**الوصف:**
```css
Text: "We Do Our Best For Your Convenience"
Color: white
Size: lg:text-[30px]
Font: Poppins
Weight: font-normal
Margin Bottom: mb-6 sm:mb-8
Text Transform: capitalize
```

**الزر:**
```css
Background: #CEAF6E
Color: #093B77
Padding: px-6 sm:px-8 py-3 sm:py-4
Border Radius: rounded-lg
Size: text-sm sm:text-base
Hover: hover:bg-[#B8941F]
Transition: transition-colors
Width: w-full max-w-xs sm:w-auto
Padding Top: pt-4
Margin Top: mt-4
```

### Desktop View - الأعمدة التفاعلية:

**التصميم:**
```css
Display: hidden md:block
Position: relative
Width: w-full
Height: h-[100vh]
Overflow: hidden
```

**الخلفية المتحركة:**
```css
Image: {columns[activeColumn].image}
Position: absolute inset-0
Width: w-full
Height: h-full
Object Fit: object-cover
Transition: transition-all duration-500
```

**الأعمدة (4 أعمدة):**

```css
Display: flex
Position: absolute inset-0
```

**كل عمود:**
```css
Flex: flex-1
Border Right: border-r border-white/20 last:border-r-0
Cursor: pointer
Hover: hover:bg-white/10
Transition: transition-all duration-300
Display: flex flex-col justify-between
```

**العنوان (Header):**
```css
Size: text-lg
Weight: font-medium
Font: Poppins
Padding: p-12
Alignment: text-center
Border Radius: rounded
Transition: transition-all duration-300

// للعمود النشط:
Background: bg-[#093B77]
Color: text-white

// للأعمدة الأخرى:
Color: text-white
```

**الوصف (Caption) - يظهر فقط للعمود النشط:**
```css
Position: absolute bottom-6 left-6 right-6
Color: text-[#CEAF6E]
Size: text-sm
Font: Poppins
Line Height: leading-relaxed
```

**الأعمدة الأربعة:**

1. **Unmatched Local Expertise**
   - Image: `/images/Rectangle 3463855.png`
   - Caption: "We Aren't Just A Rental Service..."

2. **Your Safety, Our Priority**
   - Image: `/images/Rectangle 3463856.png`
   - Caption: "Every Single Boat, Captain, And Owner..."

3. **The Full Scope Of Egypt's Waters**
   - Image: `/images/Rectangle 3463857.png`
   - Caption: "Whether Your Adventure Is On The Ancient Nile..."

4. **Effortless & Transparent Booking**
   - Image: `/images/Rectangle 3463858.png`
   - Caption: "Forget The Hassle Of Searching..."

**الحركة:**
- عند الـ `onMouseEnter` على أي عمود، الخلفية بتتغير للصورة بتاعته
- العنوان بيتلون أزرق (`bg-[#093B77]`)
- الوصف بيظهر أسفل العمود

---

## 7️⃣ Stats - الإحصائيات

### التصميم العام:

```css
Position: relative
Padding: py-8 sm:py-16
```

### خلفية الخريطة (Desktop فقط):

```css
Position: absolute inset-0
Display: hidden md:block
Image: /images/wmap.png
Width: w-[1600px]
Height: h-[300px]
Object Fit: object-contain
```

### الـ Stats Cards (Desktop View):

**التخطيط:**
```css
Display: hidden md:flex
Justify: justify-center
Gap: gap-6
Max Width: max-w-6xl
Margin: mx-auto
```

**الكاردات (4 كاردات):**

```css
Width: w-64
Height: h-46
Border Radius: rounded-2xl
Display: flex flex-col
Justify: justify-center
Alignment: items-center
Shadow: shadow-lg
```

**الترتيب والألوان:**

1. **Boat Owners (أول كارد)**
   - Background: bg-purple-700
   - Margin Top: mt-0
   - القيمة: 100+

2. **Water Activities (ثاني كارد)**
   - Background: bg-orange-300
   - Margin Top: mt-16 (أعلى من الباقي)
   - القيمة: 100+

3. **Available Trips (ثالث كارد)**
   - Background: bg-teal-500
   - Margin Top: mt-0
   - القيمة: 157+

4. **Trips Done (رابع كارد)**
   - Background: bg-red-500
   - Margin Top: mt-16 (أعلى من الباقي)
   - القيمة: 10+

**محتوى كل كارد:**

**الرقم:**
```css
Color: white
Size: text-[66px]
Weight: font-bold
Font: Poppins
Text Transform: capitalize
```

**العنوان:**
```css
Color: white
Size: text-[23px]
Weight: font-normal
Font: Poppins
Alignment: text-center
Text Transform: capitalize
```

### الحركة (Animation):

**الـ Intersection Observer:**
- بيبدأ العد لما القسم يدخل في الشاشة (threshold: 0.5)
- بيعد مرة واحدة بس (hasAnimated state)

**الـ Animation:**
```javascript
Duration: 2000ms (ثانيتين)
Easing: easeOutQuart (1 - Math.pow(1 - progress, 4))
Method: requestAnimationFrame
Start: 0
End: القيمة النهائية
```

**كل رقم بيعد من 0 للرقم النهائي بحركة سلسة:**
- Boat Owners: 0 → 100
- Water Activities: 0 → 100
- Available Trips: 0 → 157
- Trips Done: 0 → 10

---

## 8️⃣ Activities - الأنشطة

### التصميم العام:

```css
Position: relative
Padding: py-2
```

### الـ Header:

**العنوان:**
```css
Text: "Discover the Best Activities at waterways"
Color: black
Size: text-3xl md:text-6xl
Weight: font-bold
Font: Poppins
Text Transform: capitalize
Line Height: leading-tight
Alignment: text-center
Margin Bottom: mb-12
```

**الوصف:**
```css
Text: "From thrilling water sports to serene sunset cruises..."
Color: text-zinc-500
Size: text-lg md:text-2xl
Weight: font-medium
Font: Poppins
Text Transform: capitalize
Margin Top: mt-8
Max Width: max-w-3xl mx-auto
Padding: px-4
```

### الـ Activities Masonry Layout:

**التخطيط:**
```css
Display: columns-1 md:columns-2 lg:columns-3
Gap: gap-6
Max Width: max-w-7xl
Margin: mx-auto
Padding: px-4
```

**الأنشطة (6 أنشطة):**

1. **Water Sports**
   - Image: `/images/Rectangle 3463860.png`
   - Height: h-150

2. **Family Activities**
   - Image: `/images/Rectangle 3463863.png`
   - Height: h-150

3. **Boat Rides**
   - Image: `/images/Rectangle 3463861.png`
   - Height: h-200

4. **Cruises**
   - Image: `/images/Rectangle 3463865.png`
   - Height: h-100

5. **Fishing Trips**
   - Image: `/images/Rectangle 3463862.png`
   - Height: h-150

6. **Snorkelling & Diving**
   - Image: `/images/Rectangle 3463864.png`
   - Height: h-150

### تصميم كل Activity Card:

**الـ Container:**
```css
Position: relative
Overflow: hidden
Border Radius: rounded-[32px]
Margin Bottom: mb-6
Break Inside: avoid
Height: {item.height}
Group: group (للـ hover effects)
```

**الصورة:**
```css
Position: fill (absolute)
Object Fit: object-cover
Border Radius: rounded-[32px]
Transition: transition-transform duration-500
Hover: group-hover:scale-105
Quality: 85
```

**الـ Overlay (طبقة سوداء):**
```css
Position: absolute inset-0
Background: bg-black/20
Transition: duration-500
Hover: group-hover:bg-transparent
```

**العنوان:**
```css
Position: absolute bottom-4 left-1/2 transform -translate-x-1/2
Color: white
Size: text-2xl sm:text-xl
Weight: font-medium
Font: Poppins
Text Transform: capitalize
White Space: whitespace-nowrap
Alignment: text-center
Padding: px-2
```

**الحركات:**
- **Hover على الكارد:**
  - الصورة بتكبر شوية (scale-105)
  - الـ overlay السودا بتختفي (bg-transparent)

### قسم "Top Destination" (أسفل الأنشطة):

```css
Alignment: text-center
Margin Bottom: mb-8 sm:mb-16
Margin Top: mt-12 sm:mt-16
Padding: px-4
```

**العنوان الفرعي:**
```css
Text: "Where To Sail Now"
Color: #927C4E
Font: SignPainter
Size: text-3xl sm:text-4xl lg:text-5xl
Margin Bottom: mb-2 sm:mb-4
```

**العنوان الرئيسي:**
```css
Text: "Top Destination"
Color: #093B77 sm:text-black
Font: Poppins
Size: text-3xl sm:text-5xl lg:text-6xl
Weight: font-bold
Margin Bottom: mb-4 sm:mb-6
```

---

## 9️⃣ Destinations - الوجهات

### التصميم العام:

```css
Position: relative
Width: w-full
Min Height: min-h-[573px]
Background: bg-white md:bg-sky-100
Overflow: hidden
Padding: py-8 md:py-16
```

### الخلفيات الديكورية (Desktop فقط):

**الصورة اليسرى:**
```css
Image: /images/image 6.png
Position: absolute
Size: w-[1087px] h-[1023px]
Position: -left-[400px] -top-[100px]
Display: hidden lg:block
Object Fit: object-contain
Quality: 75
```

**الصورة اليمنى:**
```css
Image: /images/image 5.png
Position: absolute
Size: w-[914px] h-[1017px]
Position: right-[-200px] -top-[80px]
Display: hidden lg:block
Object Fit: object-contain
Quality: 75
```

### العنوان (Desktop فقط):

```css
Display: hidden md:block
Alignment: text-center
Margin Bottom: mb-8
```

```css
Text: "Destinations"
Color: text-black/10 (شفاف جداً)
Size: text-4xl md:text-6xl lg:text-8xl
Weight: font-bold
Font: Poppins
Text Transform: capitalize
Margin Bottom: mb-4
```

### Desktop View - الكاروسيل:

**التخطيط:**
```css
Display: hidden md:flex
Position: relative
Max Width: max-w-7xl
Margin: mx-auto
Alignment: items-center
```

**الأسهم (Navigation):**

**السهم الأيسر:**
```css
Position: absolute left-0 top-[45%] -translate-y-1/2 -translate-x-full
Z-index: 10
Margin Right: mr-4
Icon: /icons/arrow_circle_left.svg
Size: w-12 h-12 md:w-14 md:h-14
Hover: hover:scale-110
Transition: transition-transform
```

**السهم الأيمن:**
```css
Position: absolute right-0 top-[45%] -translate-y-1/2 translate-x-full
Z-index: 10
Margin Left: ml-4
Icon: /icons/arrow_circle_right.svg
Size: w-12 h-12 md:w-14 md:h-14
Hover: hover:scale-110
Transition: transition-transform
```

**الكاروسيل:**
```css
Display: flex
Gap: gap-6
Overflow: overflow-x-auto
Scrollbar: scrollbar-hide
Justify: justify-center
Width: w-full
Cursor: cursor-grab active:cursor-grabbing
Scroll Behavior: smooth (عند الضغط على الأسهم)
```

### الوجهات (5 وجهات):

1. **Philae Temple**
   - Image 1: `/images/Rectangle 3463870.png`
   - Image 2 (Hover): `/images/philae2.png`

2. **Nubian Village**
   - Image 1: `/images/nubian-village1.jpg`
   - Image 2 (Hover): `/images/nubian-village2.jpg`

3. **Botanical Garden**
   - Image 1: `/images/Aswan-Botanical-Garden1.jpg`
   - Image 2 (Hover): `/images/Aswan-Botanical-Garden2.jpg`

4. **Elephantine Island**
   - Image 1: `/images/Elephantine Island1.jpg`
   - Image 2 (Hover): `/images/Elephantine Island2.webp`

5. **Abu Simbel Temples**
   - Image 1: `/images/abusimple1.jpg`
   - Image 2 (Hover): `/images/abusimple2.jpg`

### تصميم كل Destination Card:

**الـ Container:**
```css
Display: flex flex-col items-center
Flex Shrink: flex-shrink-0
Group: group
```

**الصورة:**
```css
Position: relative
Size: w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52
Overflow: hidden
```

**الصورة الأساسية:**
```css
Position: fill
Object Fit: object-cover
Transition: transition-opacity duration-300
Opacity: opacity-100 group-hover:opacity-0
Quality: 85
```

**صورة الـ Hover:**
```css
Position: fill
Object Fit: object-cover
Transition: transition-opacity duration-300
Opacity: opacity-0 group-hover:opacity-100
Quality: 85
```

**العنوان:**
```css
Alignment: text-center
Margin Top: mt-4
Color: black
Size: text-lg md:text-xl
Weight: font-medium
Font: Poppins
Text Transform: capitalize
```

**الحركة:**
- عند الـ Hover على الكارد، الصورة الثانية بتظهر والأولى بتختفي
- Transition سلس مدته 300ms

**التمرير (Scroll):**
- الأسهم بتعمل scroll بـ 300px
- Scroll Behavior: smooth

---

## 🔟 Final CTA - الدعوة النهائية للحجز

### التصميم العام:

```css
Display: hidden md:block
Position: relative
Width: w-full
Overflow: hidden
```

### القسم العلوي (Title):

```css
Alignment: text-center
Padding: py-12
Background: white
```

```css
Text: "It's The Time Book Your Trip"
Color: #927C4E
Font: SignPainter
Size: text-4xl lg:text-5xl
Margin Top: mt-8
```

### القسم الرئيسي:

**الـ Container:**
```css
Position: relative
Width: w-full
Min Height: min-h-[600px]
Display: flex items-center
```

**الخلفية:**
```css
Image: /images/finalcta.png
Position: absolute inset-0
Width: w-full
Height: h-full
Object Fit: object-cover
Transform: scaleX(-1) (مقلوبة أفقياً)
```

**طبقة الـ Blur العلوية:**
```css
Position: absolute top-0 left-0
Width: w-full
Height: h-16
Background: white
Filter: blur-[31.90px]
```

**المحتوى:**
```css
Position: relative
Container: container mx-auto
Padding: px-4 md:px-8 lg:px-16
Max Width: max-w-2xl
```

**العنوان:**
```css
Text: "Book your Dream Voyage now"
Color: text-sky-950
Size: text-4xl
Weight: font-bold
Font: Poppins
Margin Bottom: mb-6
```

**الوصف:**
```css
Text: "Every journey with Marakbi is tailored to perfection..."
Color: text-sky-100
Size: text-base
Weight: font-medium
Font: Poppins
Margin Bottom: mb-8
Max Width: max-w-[464px]
```

**الزر:**
```css
Width: w-56
Height: h-12
Padding: px-6 py-2.5
Background: white
Border Radius: rounded-lg
Display: inline-flex justify-center items-center
Gap: gap-2.5
```

**نص الزر:**
```css
Color: text-sky-800
Size: text-base
Font: Poppins
Text Transform: capitalize
Text: "Book now"
```

---

## 1️⃣1️⃣ Footer - الفوتر

### التصميم العام:

```css
Background: bg-gradient-to-t from-[#083872] via-[#0A4489] to-[#106BD8]
Color: text-white
```

### الـ Main Footer Grid:

```css
Container: container mx-auto
Padding: px-4 sm:px-6 md:px-8 pt-12 md:pt-16 pb-4
Display: grid
Columns: grid-cols-1 md:grid-cols-5
Gap: gap-8 md:gap-6
```

### Column 1 - اللوجو والوصف:

```css
Space: space-y-4
Span: md:col-span-2
Padding: md:pr-4 lg:pr-6
```

**اللوجو:**
```css
Component: Logo
Variant: white
Size: width={64} height={80}
```

**الوصف:**
```css
Color: text-gray-300
Size: text-sm md:text-base
Line Height: leading-6 md:leading-7
Font: Poppins
Text: "Marakbi is your premier digital gateway..."
```

### Column 2 - Marakbi Services:

**العنوان:**
```css
Text: "Marakbi Services"
Color: text-amber-300
Size: text-lg md:text-xl
Weight: font-semibold
Margin Bottom: mb-4 md:mb-6
Font: Poppins
```

**القائمة:**
```css
Space: space-y-2 md:space-y-3
List Style: list-disc list-inside
Size: text-sm md:text-base
```

**العناصر (8 عناصر):**
- Boat Rentals
- Water Sports
- Family activities
- Corporate Events
- Fishing Trips
- Occasions
- Travel Boat
- Dahabya

**الـ Hover:**
```css
Hover: hover:text-orange-300
Transition: transition-colors
```

### Column 3 - Useful Links:

**العنوان:**
```css
Text: "Useful Links"
Color: text-amber-300
Size: text-lg md:text-xl
Weight: font-semibold
Margin Bottom: mb-4 md:mb-6
```

**العناصر (7 عناصر):**
- About Us → `/about-us`
- Our Team → `/our-team`
- Our Services → `/`
- FAQs → `/faqs`
- Contact Us → `/contact`
- Privacy Policy → `/privacy-policy`
- Terms & Conditions → `/terms-conditions`

### Column 4 - Subscribe:

**العنوان:**
```css
Text: "Subscribe"
Color: text-amber-300
Size: text-lg md:text-xl
Weight: font-semibold
Margin Bottom: mb-4 md:mb-6
```

**الوصف:**
```css
Text: "If you want to stay updated and receive regular information..."
Color: text-gray-300
Size: text-sm md:text-base
Font: Poppins
Margin Bottom: mb-4 md:mb-6
```

**الـ Email Newsletter Input:**

```css
Display: flex items-stretch
Width: w-full
Border Radius: rounded-lg md:rounded-xl
Overflow: hidden
Shadow: shadow-sm
```

**الـ Input Field:**
```css
Background: bg-white/90
Flex: flex-[3]
Height: h-12 md:h-14
Padding: pl-3 md:pl-4 pr-8 md:pr-10
Color: text-[#093B77]
Placeholder: placeholder-gray-500
Size: text-sm md:text-base
Border: none
Focus: focus:outline-none
```

**أيقونة الـ Email:**
```css
Position: absolute right-2 md:right-3 top-1/2 -translate-y-1/2
Size: w-5 h-5 md:w-6 md:h-6
Color: text-gray-500
```

**خط فاصل:**
```css
Width: w-px
Background: bg-[#0E5AA3]
```

**زر Subscribe:**
```css
Height: h-12 md:h-14
Padding: px-4 md:px-6
Background: #CEAF6E
Color: #093B77
Size: text-sm md:text-base
Weight: font-semibold
Hover: hover:bg-[#d8ba78]
Transition: transition-colors
Flex: flex-[1]
```

**أزرار تحميل التطبيق:**

```css
Margin Top: mt-4 md:mt-6
```

**العنوان:**
```css
Text: "Download App"
Color: text-amber-300
Size: text-base md:text-lg
Weight: font-semibold
Margin Bottom: mb-3 md:mb-4
```

**الأزرار:**
```css
Display: flex
Gap: gap-1 md:gap-2
```

**Google Play:**
```css
Icon: /icons/Google Play.svg
Size: w-28 h-10 md:w-32 md:h-12
Link: https://play.google.com/store/apps/details?id=com.marakbi.app
Hover: hover:scale-105
Transition: transition-all duration-200
```

**App Store:**
```css
Icon: /icons/App Store.svg
Size: w-28 h-10 md:w-32 md:h-12
Link: https://apps.apple.com/app/marakbi/id123456789
Hover: hover:scale-105
Transition: transition-all duration-200
```

### Sub-Footer Bar:

```css
Border Top: border-t border-gray-400
Margin Top: mt-8 md:mt-12
Padding: py-4 md:py-6
```

**التخطيط:**
```css
Display: flex flex-col md:flex-row
Justify: justify-between
Alignment: items-center
Gap: gap-4 md:gap-8
```

**معلومات الاتصال (الجانب الأيسر):**

```css
Display: flex flex-col md:flex-row
Alignment: items-center
Gap: gap-3 md:gap-6 lg:gap-8
```

**الهاتف:**
- Icon: `/icons/phone_in_talk_y.svg` (w-4 h-4 md:w-5 md:h-5)
- Text: "+2010 31 41 6 900"
- Link: `tel:+201031416900`

**الإيميل:**
- Icon: `/icons/mail-1.svg`
- Text: "info@marakbi.tours"
- Link: `mailto:info@marakbi.tours`

**الموقع:**
- Icon: `/icons/home_pin.svg`
- Text: "Aswan - Egypt"

**الـ Social Media Icons (الجانب الأيمن):**

```css
Display: flex items-center
Gap: gap-4 md:gap-6
```

الأيقونات:
- Facebook: `/icons/Facebook.svg` → `https://www.facebook.com/profile.php?id=61578325940602`
- LinkedIn: `/icons/Linkedin.svg` → `https://www.linkedin.com/company/marakbi`
- Instagram: `/icons/instgram.svg` → `https://www.instagram.com/marakbi_app/`
- YouTube: `/icons/youtube.svg` → `https://www.youtube.com/@marakbi`

```css
Size: w-6 h-6
Hover: hover:opacity-80
Transition: transition-opacity
```

### Copyright Bar:

```css
Border Top: border-t border-gray-400
Padding: py-4
```

**التخطيط:**
```css
Display: flex flex-col md:flex-row
Justify: justify-between
Alignment: items-center
Gap: gap-3 md:gap-4
```

**نص Copyright (الجانب الأيسر):**
```css
Text: "© 2025 Marakbi- Boat rentals. All rights reserved"
Color: text-gray-400
Size: text-xs md:text-sm
Font: Poppins
Alignment: text-center md:text-left
```

**الروابط (الجانب الأيمن):**
```css
Display: flex items-center
Gap: gap-4 md:gap-6
Size: text-xs md:text-sm
```

الروابط:
- Privacy Policy → `/privacy-policy`
- Terms of Use → `/terms-conditions`
- Cookie Policy → `/privacy-policy`

```css
Color: text-gray-400
Hover: hover:text-orange-300
Transition: transition-colors
```

---

## 🎨 ألوان النظام الأساسية

```css
Primary Blue: #093B77
Secondary Blue: #0C4A8C
Hover Blue: #0A3D7A
Dark Blue: #072D5B
Sky Blue: #106BD8

Gold/Orange: #CEAF6E
Orange: #927C4E
Orange Hover: #B8941F

Purple: purple-700
Orange Card: orange-300
Teal: teal-500
Red: red-500

White/Transparent: white/20, white/30, white/90
Black Overlay: black/20, black/30, black/60

Text Colors:
- Primary Text: black
- Secondary Text: gray-400, gray-500, gray-700
- White Text: white
```

---

## 🔤 الخطوط (Fonts)

```css
Primary Font: Poppins (للنصوص العادية)
Decorative Font: SignPainter (للعناوين الذهبية)

Font Weights:
- Normal: font-normal
- Medium: font-medium
- Semibold: font-semibold
- Bold: font-bold
```

---

## ⚡ الحركات والـ Transitions الرئيسية

### 1. Hero Background:
```css
Transition: transition-all duration-1000 ease-in-out
Interval: 5000ms (كل 5 ثواني)
```

### 2. Featured Activities Images:
```css
Transition: transition-all duration-500 ease-in-out
Hover: hover:scale-110
Active Scale: scale-105
```

### 3. Service Cards:
```css
Hover: hover:shadow-xl
Transition: transition-shadow duration-300
```

### 4. Why Choosing Us Columns:
```css
Background Transition: transition-all duration-500
Column Hover: hover:bg-white/10
Column Active: bg-[#093B77]
Transition: transition-all duration-300
```

### 5. Stats Numbers Animation:
```css
Duration: 2000ms
Easing: easeOutQuart
Trigger: Intersection Observer (threshold: 0.5)
Method: requestAnimationFrame
```

### 6. Activities Cards:
```css
Image: transition-transform duration-500 group-hover:scale-105
Overlay: duration-500 group-hover:bg-transparent
```

### 7. Destinations Cards:
```css
Image Transition: transition-opacity duration-300
Hover: opacity swap (0 → 100 والعكس)
```

### 8. Boat Cards:
```css
Rating Thumbs Up: hover:bg-orange-500
```

### 9. Buttons:
```css
General: transition-colors duration-300
Explore Now: hover:bg-[#0A3D7A]
Book now: transition-all duration-300
```

### 10. Header Search:
```css
Input Expansion: transition-all duration-300 ease-out
Suggestions: transition-opacity duration-200
```

### 11. Footer Icons:
```css
Hover: hover:opacity-80
App Buttons: hover:scale-105 transition-all duration-200
```

---

## 📱 Breakpoints المستخدمة

```css
sm: 640px وما فوق
md: 768px وما فوق
lg: 1024px وما فوق

معظم العناصر:
- مخفية على الموبايل: hidden sm:block أو hidden md:flex
- ظاهرة فقط على Desktop: hidden md:block
```

---

## 🖼️ الأيقونات والصور المطلوبة

### Icons:
```
/icons/Frame 42.svg
/icons/Frame 37.svg
/icons/boat-helm-svgrepo-com 1.svg
/icons/Frame 1321316342.svg
/icons/Gift.svg
/icons/Wakeboarding.svg
/icons/Line 74.svg
/icons/tick.svg
/icons/Star Icon.svg
/icons/thumb_up.svg
/icons/location_on.svg
/icons/groups_2.svg
/icons/award_meal.svg
/icons/bed.svg
/icons/arrow_circle_left.svg
/icons/arrow_circle_right.svg
/icons/phone_in_talk-1.svg
/icons/mail.svg
/icons/phone_in_talk_y.svg
/icons/mail-1.svg
/icons/home_pin.svg
/icons/Facebook.svg
/icons/Linkedin.svg
/icons/instgram.svg
/icons/youtube.svg
/icons/Google Play.svg
/icons/App Store.svg
```

### Images:
```
Hero Backgrounds:
- /images/Rectangle 3463841.png
- /images/Rectangle 3463845.png
- /images/Rectangle 3463846.png

Featured Activities:
- /images/f1.png
- /images/f2.png
- /images/f3.png

About:
- /images/image 1.png
- /images/image 2.png

Boat Fleet:
- /images/Frame 1321316346.png (background)
- /images/Rectangle 3463853.png
- /images/Rectangle 3463855.png
- /images/Rectangle 3463856.png

Why Choosing Us:
- /images/Rectangle 3463855.png
- /images/Rectangle 3463856.png
- /images/Rectangle 3463857.png
- /images/Rectangle 3463858.png

Stats:
- /images/wmap.png

Activities:
- /images/Rectangle 3463860.png
- /images/Rectangle 3463863.png
- /images/Rectangle 3463861.png
- /images/Rectangle 3463865.png
- /images/Rectangle 3463862.png
- /images/Rectangle 3463864.png

Destinations:
- /images/image 6.png
- /images/image 5.png
- /images/Rectangle 3463870.png
- /images/philae2.png
- /images/nubian-village1.jpg
- /images/nubian-village2.jpg
- /images/Aswan-Botanical-Garden1.jpg
- /images/Aswan-Botanical-Garden2.jpg
- /images/Elephantine Island1.jpg
- /images/Elephantine Island2.webp
- /images/abusimple1.jpg
- /images/abusimple2.jpg

Final CTA:
- /images/finalcta.png
```

---

## 📝 ملاحظات مهمة

1. **الـ Header** بيتغير حسب الصفحة:
   - على الـ Home: `variant="transparent"` مع خلفية شفافة
   - على الصفحات الأخرى: `variant="solid"` مع خلفية بيضاء

2. **الحركات التلقائية:**
   - Hero Background: بتتغير كل 5 ثواني
   - Stats Numbers: بتعد مرة واحدة لما القسم يظهر
   - Why Choosing Us: بتتغير الخلفية على الـ hover

3. **الصور المزدوجة:**
   - Featured Activities: كل صورة مرتبطة بخلفية معينة
   - Destinations: كل وجهة ليها صورتين (عادية و hover)

4. **الـ Dropdowns:**
   - كل القوائم المنسدلة بتستخدم `bg-white/30 backdrop-blur-sm`
   - Focus rings: `focus:ring-2 focus:ring-white/50`

5. **الـ Spacing:**
   - معظم الأقسام: `py-8 sm:py-20`
   - الـ Gaps: `gap-6 sm:gap-8`
   - الـ Padding: `px-4 sm:px-6 lg:px-8`

6. **الـ Z-index Layers:**
   - Header: `z-50`
   - Main content: `z-10`
   - Arrows/Navigation: `z-10`

7. **الـ Quality للصور:**
   - Hero: `quality={90}`
   - Featured Activities: `quality={85}`
   - Destinations: `quality={75}` (للخلفيات)، `quality={85}` (للكاردات)

---

## ✅ الخلاصة

الصفحة بتتكون من 11 قسم رئيسي، كل قسم ليه:
- تصميم مخصص للديسكتوب
- حركات وتفاعلات محددة
- ألوان وخطوط ثابتة
- صور وأيقونات معينة

**الحركات الرئيسية:**
1. تبديل تلقائي للخلفيات (Hero)
2. عد الأرقام بحركة (Stats)
3. تغيير الصور على الـ hover (Destinations)
4. تكبير الصور على الـ hover (Activities, Featured Activities)
5. تغيير الخلفية على الـ hover (Why Choosing Us)

**النقاط المهمة للتطبيق:**
- استخدم Next.js Image component للصور
- استخدم Intersection Observer للـ Stats animation
- استخدم state management للـ active items
- استخدم Tailwind CSS للـ styling
- اهتم بالـ transitions و durations
- اهتم بالـ hover effects و group utilities

