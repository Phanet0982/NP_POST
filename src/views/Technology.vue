<template>
  <div class="tech p-6 bg-slate-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
    <div class="flex items-center justify-between mb-10">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="absolute -inset-1 bg-cyan-400 rounded-full blur opacity-25 animate-pulse"></div>
          <div class="relative w-3 h-10 bg-cyan-500 rounded-full"></div>
        </div>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">បច្ចេកវិទ្យា</h2>
      </div>
      <button class="text-cyan-600 font-bold text-sm hover:underline">មើលទាំងអស់</button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="n in 8" 
        :key="n" 
        class="group relative bg-white rounded-3xl p-5 transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-cyan-200 hover:shadow-[0_20px_50px_rgba(8,112,184,0.1)]"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

        <div class="relative z-10 flex flex-col items-center">
          <div class="relative mb-4">
            <div class="absolute -inset-2 bg-gradient-to-tr from-cyan-500 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-12"></div>
            <img 
              :src="`https://picsum.photos/seed/tech${n}/300/300`" 
              class="w-24 h-24 object-cover rounded-2xl shadow-lg border-2 border-white transition-transform duration-500 group-hover:scale-110"
              alt="Tech Product"
            >
          </div>

          <div class="text-center">
            <span class="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-2 block">Premium 2026</span>
            <h6 class="font-bold text-slate-700 leading-snug group-hover:text-cyan-600 transition-colors">
              ផលិតផលថ្មីប្រចាំឆ្នាំ ២០២៦
            </h6>
            
            <div class="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
              <button class="flex items-center gap-2 text-xs font-bold text-cyan-600 mx-auto">
                ព័ត៌មានបន្ថែម <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Cubic Bezier for smooth tech feel */
.tech div {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>