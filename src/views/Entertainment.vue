<template>
  <div class="entertainment p-4 md:p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-2 h-8 bg-red-600 rounded-full"></div>
      <h2 class="text-3xl font-black text-gray-800 tracking-tight">កម្សាន្ត</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
      <div 
        v-for="n in 9" 
        :key="n" 
        :class="[
          'relative group overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border-4 border-white',
          n === 1 ? 'md:col-span-2 md:row-span-2 col-span-2 row-span-2' : '', /* Featured big card */
          n === 5 ? 'md:col-span-2' : '' /* Wide card */
        ]"
      >
        <img 
          :src="`https://picsum.photos/seed/ent${n}/600/600`" 
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt="Entertainment"
        >

        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div class="text-white">
            <p class="text-xs font-medium uppercase tracking-wider mb-1 text-red-400">Trending</p>
            <h3 class="font-bold text-sm md:text-base leading-tight">រូបភាពកម្សាន្តថ្មីៗបង្កប់អត្ថន័យ</h3>
          </div>
        </div>

        <div v-if="n === 1" class="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
          Hot News
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <button class="px-8 py-3 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 font-bold rounded-xl transition-colors duration-300 border border-gray-200">
        មើលបន្ថែមទៀត
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Smooth entering animation */
.entertainment {
  animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>