<template>
  <div class="popular-section p-2">
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="h-10 w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">ពេញនិយម</h2>
      </div>
      <div class="flex gap-2">
        <button class="p-2 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all"><i class="bi bi-chevron-left"></i></button>
        <button class="p-2 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all"><i class="bi bi-chevron-right"></i></button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-7 group cursor-pointer">
        <div class="relative overflow-hidden rounded-[2rem] shadow-xl aspect-[16/10]">
          <img 
            src="https://picsum.photos/seed/pop1/800/500" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Featured Popular"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
          
          <div class="absolute bottom-0 p-6 md:p-8">
            <span class="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">Trending No. 1</span>
            <h3 class="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
              អត្ថបទដែលទទួលបានការចាប់អារម្មណ៍ខ្លាំងបំផុតប្រចាំសប្តាហ៍នេះ
            </h3>
            <div class="flex items-center gap-4 text-gray-300 text-sm">
              <span class="flex items-center gap-1"><i class="bi bi-clock"></i> ៥ នាទីមុន</span>
              <span class="flex items-center gap-1"><i class="bi bi-eye"></i> ១២.៥K នាក់</span>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 flex flex-col gap-4">
        <div 
          v-for="n in 3" 
          :key="n" 
          class="flex items-center gap-4 p-3 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 group cursor-pointer border border-transparent hover:border-blue-50"
        >
          <div class="w-24 h-24 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded-2xl shadow-sm">
            <img 
              :src="`https://picsum.photos/seed/pop${n+1}/300/300`" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            >
          </div>
          <div class="flex-grow">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-bold text-blue-500 uppercase">ចំណាត់ថ្នាក់ #{{ n + 1 }}</span>
            </div>
            <h4 class="font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
              ព្រឹត្តិការណ៍ថ្មីដែលអ្នកមិនគួររំលង...
            </h4>
            <p class="text-xs text-slate-400 mt-2 flex items-center gap-3">
              <span><i class="bi bi-calendar3"></i> ១១ មករា ២០២៦</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>