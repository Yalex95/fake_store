<template>
  <div>
    
    <Nav/>
    <main>
      <slot />
    </main>
    <footer class="border-t-2 border-gray-200">

      <div class="flex justify-center items-center flex-col w-11/12 mx-auto py-20 ">
        <div class="grid grid-cols-4 gap-20">
          <div class="text-center">
            <img src="/images/logos/logo_shop.webp" alt="Fake Shop Logo" class="text-center mx-auto"/>
          </div>
          <div class="about">
            <h3 class="mb-3 uppercase font-bold">about us</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ab cupiditate molestias quae error maxime qui. Distinctio tempora omnis rerum natus quae laudantium. Reiciendis totam voluptas eius fugit dignissimos sapiente.
          </div>
          <div class="quick-links ">
            <h3 class="font-bold  mb-3 uppercase">Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>
          <div class="contact">

            <h3 class="font-bold mb-3 uppercase">Contact Us</h3>
            <ul>
              <li> <UIcon name="i-lucide-lightbulb" class="size-5" /> <a href="mailto:fakestore@fake.com">OnlineShop@fake.com</a> </li>
              <li> <UIcon name="i-lucide-lightbulb" class="size-5" /> Boulevard Agua Caliente C 11999, Hipodromo, Tijuana, B.C. </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-gray-100 text-center py-4 w-full ">
      <p class="text-gray-600">© 2023 Fake Store. All rights reserved.</p>
    </div>
    </footer>
  </div>
</template>
