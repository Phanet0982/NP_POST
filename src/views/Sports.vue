<template>
  <div class="sports-section p-2 md:p-4">
    <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
      <div class="flex items-center gap-3">
        <div class="bg-green-500 p-2 rounded-xl rotate-12 shadow-lg shadow-green-200">
          <i class="bi bi-trophy-fill text-white text-xl"></i>
        </div>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">កីឡា <span class="text-green-500">Sports</span></h2>
      </div>
      <span class="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black animate-pulse">
        <span class="w-2 h-2 bg-red-600 rounded-full"></span> LIVE SCORE
      </span>
    </div>

    <div class="space-y-6">
      <div 
        v-for="n in 3" 
        :key="n" 
        class="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
      >
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3 relative overflow-hidden">
            <img 
              :src="`https://picsum.photos/seed/sport${n}/600/400`" 
              class="w-full h-full object-cover aspect-video md:aspect-auto transition-transform duration-700 group-hover:scale-110"
              alt="Sports news"
            >
            <div class="absolute top-4 left-4">
              <span class="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase border border-white/20">
                Football
              </span>
            </div>
          </div>

          <div class="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-green-600 font-black text-[10px] uppercase tracking-widest">🏆 Championship</span>
              <span class="text-gray-300">•</span>
              <span class="text-gray-400 text-xs font-medium">១០ មករា ២០២៦</span>
            </div>
            
            <h4 class="text-xl md:text-2xl font-black text-slate-800 leading-tight mb-3 group-hover:text-green-600 transition-colors">
              ការប្រកួតបាល់ទាត់ជាតិលើកទី៣ ចាប់ផ្ដើមនៅថ្ងៃស្អែក
            </h4>
            
            <p class="text-slate-500 text-sm md:text-base line-clamp-2 mb-6">
              ក្រុមបាល់ទាត់មកពីគ្រប់ខេត្តក្រុងនឹងមកជួបគ្នា ដើម្បីប្រកួតប្រជែងយកពានរង្វាន់ឯកឧត្តម...
            </p>

            <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
              <div class="flex items-center gap-4">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold">BTB</div>
                  <div class="w-8 h-8 rounded-full border-2 border-white bg-red-100 flex items-center justify-center text-[10px] font-bold">PP</div>
                </div>
                <span class="text-xs font-bold text-slate-400">Match Preview</span>
              </div>
              <button class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>