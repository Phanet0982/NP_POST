<template>
  <div class="min-h-screen bg-[#40C4FF] flex items-center justify-center p-6">
    <div class="bg-white w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden relative border border-gray-100">
      
      <div class="bg-[#0A1128] pt-12 pb-24 relative overflow-hidden text-center">
        <div class="absolute top-4 right-6 text-gray-400 text-2xl cursor-pointer">×</div>
        
        <div class="absolute top-0 right-0 w-32 h-32 bg-[#1A2544] rotate-45 -translate-y-16 translate-x-10 opacity-50"></div>
        <div class="absolute top-10 right-4 w-12 h-12 bg-[#1A2544] rounded-lg rotate-12 opacity-30"></div>

        <div class="relative z-10 flex flex-col items-center">
          <div class="w-10 h-10 bg-[#4D7CFF] rounded-lg flex items-center justify-center mb-2 shadow-lg">
            <div class="w-5 h-5 border-2 border-white rotate-45 flex items-center justify-center">
              <div class="w-1 h-1 bg-white"></div>
            </div>
          </div>
          <h1 class="text-white text-3xl font-bold tracking-tight">Life<span class="font-light">BOX</span></h1>
        </div>

        <div class="absolute bottom-[-1px] left-0 w-full">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 80px; width: 100%;">
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #fff;"></path>
          </svg>
        </div>
      </div>

      <div class="px-8 pb-10">
        <div class="mb-8">
          <h2 class="text-[#0A1128] text-2xl font-bold leading-tight">
            <span class="text-[#2D5BFF]">{{ isLogin ? 'Log in' : 'Sign up' }}</span> 
            {{ isLogin ? 'to your account' : 'to use all features' }}
          </h2>
          <p class="text-gray-500 text-sm mt-1">
            {{ isLogin ? 'to continue' : 'of the application' }}
          </p>
        </div>

        <div class="space-y-5">
          <div class="space-y-1">
            <label class="text-gray-400 text-xs font-medium ml-1">Username or Email</label>
            <input 
              type="text" 
              placeholder="yourmail@mail.com" 
              class="w-full px-4 py-3 bg-[#EFEFEF] rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div class="space-y-1">
            <label class="text-gray-400 text-xs font-medium ml-1">Password</label>
            <div class="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                class="w-full px-4 py-3 bg-[#EFEFEF] rounded-lg text-gray-600 focus:outline-none"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 text-xl cursor-pointer">👁️</span>
            </div>
          </div>

          <div v-if="!isLogin" class="space-y-1">
            <label class="text-gray-400 text-xs font-medium ml-1">Confirm Password</label>
            <div class="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                class="w-full px-4 py-3 bg-[#EFEFEF] rounded-lg text-gray-600 focus:outline-none"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 text-xl cursor-pointer">👁️</span>
            </div>
          </div>

          <div class="flex items-start space-x-2 pt-2">
            <input type="checkbox" id="check" class="mt-1 w-4 h-4 accent-gray-600 rounded">
            <label for="check" class="text-gray-500 text-xs leading-tight">
              {{ isLogin ? 'Remember Me' : 'I agree to signing up terms and conditions.' }}
            </label>
          </div>

          <div class="pt-4">
            <button class="w-full py-4 bg-gradient-to-b from-[#1A37FF] to-[#050B1D] text-white font-bold rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-[0.98] transition-all tracking-widest text-sm">
              {{ isLogin ? 'LOG IN' : 'REGISTER' }}
            </button>
          </div>

          <div class="text-center pt-4">
            <a v-if="isLogin" href="#" class="text-[#2D5BFF] text-xs italic underline block mb-4">forgot password?</a>
            <p class="text-gray-400 text-xs">
              {{ isLogin ? "Don't have an account?" : "Already a member?" }}
              <span 
                @click="isLogin = !isLogin" 
                class="text-[#2D5BFF] font-bold cursor-pointer hover:underline"
              >
                {{ isLogin ? 'Register now' : 'Log in' }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isLogin = ref(true);
</script>

<style>
/* Mimicking the specific input and button font aesthetics */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
body {
  font-family: 'Inter', sans-serif;
}
</style>