<template>
  <div class="min-h-screen bg-gray-50 font-['Khmer_OS_Battambang'] text-gray-900">
    <NavbarPage 
      :menu-items="['ពេញនិយម', 'កីឡា', 'បច្ចេកវិទ្យា', 'កំសាន្ត', 'សង្គម']" 
      @select-category="setCategory" 
    />

    <div class="container mx-auto px-4 py-8 mt-5">
      
      <div v-if="currentCategory === 'Home'" class="animate-fadeIn">
        <div class="flex items-center justify-between mb-8 border-b-2 border-blue-600 pb-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-lg">
              <i class="fa-solid fa-bolt-lightning text-xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold">ព័ត៌មានថ្មីៗទាន់ហេតុការណ៍</h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="post in posts.slice(0, 6)" :key="post.id" 
               class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
            <div class="relative overflow-hidden aspect-video">
              <img :src="post.image" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" :alt="post.title">
              <span class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {{ post.category }}
              </span>
            </div>
            <div class="p-5">
              <h5 class="text-lg font-bold leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {{ post.title }}
              </h5>
              <p class="text-gray-500 text-sm line-clamp-3 mb-4">{{ post.excerpt }}</p>
              <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                <span class="text-gray-400 text-xs flex items-center gap-1">
                  <i class="fa-regular fa-calendar-days"></i> {{ post.date }}
                </span>
                <button class="text-blue-600 text-sm font-bold hover:underline">អានបន្ត</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="animate-fadeIn">
        <div class="mb-10 border-l-8 border-blue-600 pl-6 py-2">
          <h1 class="text-4xl md:text-5xl font-black">{{ currentCategory }}</h1>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
          <i class="fa-solid fa-folder-open text-7xl text-gray-300 mb-4 block"></i>
          <h4 class="text-gray-500 text-xl">មិនទាន់មានព័ត៌មានថ្មីៗសម្រាប់ផ្នែកនេះនៅឡើយទេ។</h4>
          <button @click="setCategory('Home')" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-bold transition-all">
            ត្រឡប់ទៅទំព័រដើម
          </button>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7">
            <div class="group cursor-pointer">
              <div class="overflow-hidden rounded-3xl shadow-lg aspect-video mb-6">
                <img :src="filteredPosts[0].image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" :alt="filteredPosts[0].title">
              </div>
              <h2 class="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{{ filteredPosts[0].title }}</h2>
              <p class="text-gray-500 text-lg leading-relaxed">{{ filteredPosts[0].excerpt }}</p>
            </div>
          </div>

          <div class="lg:col-span-5">
            <h5 class="text-blue-600 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <span class="w-8 h-[2px] bg-blue-600"></span> ព័ត៌មានពាក់ព័ន្ធ
            </h5>
            <div class="space-y-6">
              <div v-for="post in filteredPosts.slice(1, 6)" :key="post.id" class="flex gap-4 group cursor-pointer">
                <div class="w-32 h-20 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
                  <img :src="post.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="">
                </div>
                <div>
                  <h6 class="font-bold text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{{ post.title }}</h6>
                  <div class="text-gray-400 text-[10px] mt-1 uppercase">{{ post.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 bg-slate-900 p-6 md:p-10 rounded-[3rem] shadow-2xl overflow-hidden relative">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full animate-pulse">
            <i class="fa-solid fa-play"></i>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white">វីដេអូថ្មីៗ</h2>
          <span class="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> LIVE
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="video in videos" :key="video.id" class="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-hover hover:-translate-y-2 duration-300">
            <div class="relative aspect-video">
              <iframe :src="video.url" class="w-full h-full" allowfullscreen></iframe>
              <div class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                <i class="fa-regular fa-clock"></i> {{ video.time }}
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-[10px] font-bold px-2 py-1 rounded text-white uppercase tracking-tighter" :class="video.badgeClass === 'news-bg' ? 'bg-red-500' : 'bg-blue-500'">
                  <i :class="video.icon" class="mr-1"></i> {{ video.category }}
                </span>
                <button class="text-slate-400 hover:text-white transition-colors"><i class="fa-solid fa-share-nodes"></i></button>
              </div>
              <h3 class="text-white font-bold text-sm line-clamp-2 h-10 leading-snug mb-3">{{ video.title }}</h3>
              <div class="flex justify-between text-slate-400 text-[10px] border-t border-slate-700 pt-3">
                <span><i class="fa-regular fa-calendar-days mr-1"></i> {{ video.date }}</span>
                <span><i class="fa-regular fa-eye mr-1"></i> {{ video.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div> 

    <FooterPage class="mt-20" :menu-items="['ពេញនិយម', 'កីឡា', 'បច្ចេកវិទ្យា', 'កំសាន្ត']" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentCategory = ref("Home")

// --- News Articles Data ---
const posts = ref([
  { id: 1, title: "ក្រុមហ៊ុន អូស៊ីអាយស៊ី (OCIC) សហការជាមួយ Ezesoft WiFi នៅទីក្រុងនរា", excerpt: "ក្រុមហ៊ុនវិនិយោគទុនអាណិកជនកម្ពុជា (OCIC) ដែលជាក្រុមហ៊ុនវិនិយោគ និងអភិវឌ្ឍក្នុងស្រុកដ៏ចម្រុះមួយ...", category: "ពេញនិយម", date: "២០ ធ្នូ ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/ezsoft/69463d8d0fc4a_1766210940_large.jpg" },
  { id: 2, title: "«រត់ដើម្បីវីរជនជួរមុខ» មានចំនួនអ្នកចូលរួមដល់ជាង ៤០០០នាក់", excerpt: "អ្នករត់ជាង ៤០០០ នាក់បានប្រមូលផ្តុំគ្នានៅកោះពេជ្រ ដើម្បីគាំទ្រដល់វីរជនជួរមុខរបស់កម្ពុជា...", category: "ពេញនិយម", date: "១៧ ធ្នូ ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/fineart/6943bf60058db_1766047560_large.jpg" },
  { id: 3, title: "Midea រៀបចំសន្និសីទតំណាងចែកចាយលើកដំបូងរបស់ខ្លួន", excerpt: "នៅឯកោះបាលី ប្រទេសឥណ្ឌូណេស៊ី Midea បានបង្ហាញបច្ចេកវិទ្យាថ្មីចុងក្រោយបំផុតរបស់ខ្លួន...", category: "ពេញនិយម", date: "២៩ កញ្ញា ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/Z-media/68dcdd400dc70_1759305000_large.jpg" },
  { id: 4, title: "ក្រុមហ៊ុនខ្មែរធំៗគាំទ្រក្រុមសិល្បករ បារមី ក្នុងកម្មវិធី «Rise For Khmer»", excerpt: "ក្រុមហ៊ុនធំៗចំនួនបីរបស់កម្ពុជា បានសហការគ្នាលើកស្ទួយវិស័យសិល្បៈខ្មែរលើឆាកអន្តរជាតិ...", category: "កំសាន្ត", date: "០១ ធ្នូ ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/barameyinparis/692a866962a39_1764394560_large.jpg" },
  { id: 5, title: "កម្មវិធី Metfone STARS រដូវកាលទី ២ វគ្គផ្តាច់ព្រ័ត្រ៖ ជោគជ័យដ៏អស្ចារ្យ", excerpt: "នៅថ្ងៃទី ១២ ខែតុលា ឆ្នាំ២០២៥ ក្រុមហ៊ុនមិត្តហ្វូន ជាក្រុមហ៊ុនទូរគមនាគមន៍ឈានមុខនៅកម្ពុជា បានរៀបចំវគ្គផ្តាច់ព្រ័ត្រដ៏រំភើប...", category: "កំសាន្ត", date: "១២ តុលា ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/Metfone(2)/68ecd05e1e13d_1760350260_large.jpg" },
  { id: 6, title: "Usyk កីឡាករប្រដាល់អ៊ុយក្រែន ដែលកំទេចជើងខ្លាំងនៅទម្ងន់ធ្ងន់", excerpt: "Oleksandr Usyk បន្តគ្រងតំណែងជើងឯកពិភពលោក បន្ទាប់ពីយកឈ្នះគូប្រកួតយ៉ាងចាស់ដៃ...", category: "កីឡា", date: "២១ កក្ដា ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Bun.Sophearum/Sport(4)/(10)/687db89f30343_1753069680_large.jpg" },
  { id: 7, title: "វណ្ណដានឹងបន្តការសម្តែងក្នុងវគ្គទី៥ នៃការប្រគំតន្ត្រីដ៏អស្ចារ្យរបស់ខ្លួន នៅក្នុងកម្មវិធីការប្រកួតផ្ដាច់ព្រ័ត្រព្រឹត្តិការណ៍ ", excerpt: "ការប្រគំតន្ត្រី ត្រីវិស័យសុវណ្ណភូមិ ដែលប្រព្រឹត្តឡើងនៅពហុកីឡដ្ឋានជាតិអូឡាំពិកកាលពីពេលថ្មីៗនេះ ជាការប្រគំតន្ត្រីធំបំផុតនៃអាល់ប៊ុមចម្រៀងទី ៣ របស់លោក វណ្ណដា...", category: "កីឡា", date: "២៣ កក្ដា ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/file47/684bab54d0356_1749789480_large.jpg" },
  { id: 8, title: "កម្ពុជា​ នឹងធ្វើម្ចាស់ផ្ទះរៀបចំការប្រកួតកីឡាវាយកូនហ្គោល International Series ដ៏ធំជាលើកដំបូង ឆ្នាំ២០២៥ ", excerpt: "ការប្រកួតវាយកូនហ្គោលអាជីពអន្តរជាតិ (International Series) បានបន្ថែមទីតាំងដ៏អស្ចារ្យថ្មីមួយទៀតហើយ សម្រាប់ការប្រកួតជម្រុះ នៅក្នុងរដូវកាលឆ្នាំ ២០២៥...", category: "កីឡា", date: "១២ តុលា ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Chin-Sopheak/CS-25-5/68119cbdbd58b_1745984700_large.jpg" },
  { id: 9, title: "ខ្សែសាករបស់ Apple ប្រើមិនបានយូរ បែក! មានមូលហេតុពាក់ព័ន្ធនឹង Steve Jobs", excerpt: "ខ្សែសាករបស់ iPhone, iPad និង Macbook ត្រូវបានអ្នកប្រើជាច្រើនត្អូញត្អែរ អំពីគុណភាពជ័ររបស់វា...", category: "បច្ចេកវិទ្យា", date: "០៤ កក្កដា ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/TECH-KK/KOSAL/kosal019/60af6e161f90b_1622109660_large.jpg" },
  { id: 10, title: "លោកអ្នកឧកញ៉ាបណ្ឌិត ពុង ឃាវសែ ឧបត្ថម្ភថវិការចំនួន ៣លានដុល្លារ សម្រាប់ជួយកងទ័ព", excerpt: "លោកអ្នកឧកញ៉ាបណ្ឌិត ពុង ឃាវសែ ប្រធានក្រុមប្រឹក្សាភិបាលនៃ កាណាឌីយ៉ា គ្រុប បានចូលរួមឧបត្ថម្ភថវិការ...", category: "សង្គម", date: "១២ ធ្នូ ២០២៥", image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Rith.file/pksocic/693bc44fe4d42_1765524540_large.png" }
])

const videos = ref([
  { id: 1, url: "https://www.youtube.com/embed/2f_PfhVK-7U", time: "12:45", title: "ពលរដ្ឋស្រក់ទឹកភ្នែក ថៃ ដោះលែងវីរៈកងទ័ពកម្ពុជា១៨នាក់ហើយ", category: "Hot News", badgeClass: "news-bg", icon: "fa-solid fa-fire", date: "២៣ តុលា ២០២៥", views: "15K" },
  { id: 2, url: "https://www.youtube.com/embed/YVwlD8THsv4", time: "08:20", title: "ស្ថានការណ៍ព្រំដែនកម្ពុជា-ថៃ, តាមាន់ តាក្របី ខ្នារ ថៃសង្រ្គប់ខ្លាំងណាស់", category: "Military", badgeClass: "military-bg", icon: "fa-solid fa-shield-halved", date: "២៩ តុលា ២០២៥", views: "9.2K" },
  { id: 3, url: "https://www.youtube.com/embed/I2ijSy2xNWw", time: "10:05", title: "អាសន្នព្រំដែន! 🇰🇭 ថៃមិនទាន់ដោះលែងទ័ពខ្មែរ ១៨ នាក់? | ថៃចោទរឿងមីន!", category: "Update", badgeClass: "update-bg", icon: "fa-solid fa-rotate", date: "៣០ ធ្នូ ២០២៥", views: "22K" },
  { id: 4, url: "https://www.youtube.com/embed/mdJYeDi3a4g", time: "10:05", title: "បន្ទាន់! ដោះលែងហើយ! 🇰🇭 វីរកងទ័ព ១៨ នាក់មកដល់ខ្មែរ!", category: "Update", badgeClass: "update-bg", icon: "fa-solid fa-rotate", date: "៣១ ធ្នូ ២០២៥", views: "32K" },
  { id: 5, url: "https://www.youtube.com/embed/yjl7CXZZmLc", time: "10:05", title: "ហុំព័ទ្ធយកដីគេហើយ! បែរជាបិទផ្លូវមិនឱ្យកម្ពុជាតវ៉ា ទាមទាដី", category: "Update", badgeClass: "update-bg", icon: "fa-solid fa-rotate", date: "៣០ ធ្នូ ២០២៥", views: "22K" },
  { id: 6, url: "https://www.youtube.com/embed/sGvauwakWBk", time: "10:05", title: "ព្រះអង្គចន្ទមុនីសូមឲ្យកងទ័ព១៨រួចផុតភ័យ ម៉ោង១២ថៃដោះលែង", category: "Update", badgeClass: "update-bg", icon: "fa-solid fa-rotate", date: "២៩ ធ្នូ ២០២៥", views: "2K" }
])

const filteredPosts = computed(() => {
  if (currentCategory.value === 'Home') return posts.value;
  return posts.value.filter(post => post.category === currentCategory.value);
})

function setCategory(cat) {
  currentCategory.value = cat
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style>
/* Custom animations for Tailwind */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Line clamping is built into Tailwind now, but these act as backups */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>