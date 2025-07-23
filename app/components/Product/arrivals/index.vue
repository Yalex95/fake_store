<template>
  <div class="flex gap-5 flex-col w-8/12 mx-auto mt-10">
        <SectionHeader title="New Arrivals"/>
        <div
          id="new-arrivals"
          class="flex justify-center items-center gap-10"
        >
          <div
            v-for="arrival in arrivals"
            :key="arrival.id"
            class="product flex w-1/2 border-gray-200 border-2 rounded-lg p-5 gap-10"
          >
            <div class="product-details flex flex-col gap-5">
              <h2
                class="product-name text-2xl uppercase font-semibold line-clamp-2"
              >
                {{ arrival.title }}
              </h2>
              <p class="product-description line-clamp-2">
                {{ arrival.description }}
              </p>
              <p class="product-price">$ {{ arrival.price }}</p>
              <UButton
                :to="arrival.href"
                trailing-icon="i-lucide-arrow-right"
                size="md"
                color="neutral"
                variant="ghost"
                class="w-fit"
                >View Details</UButton
              >
            </div>
            <img
              :src="arrival.image"
              :alt="arrival.title"
              class="object-fit w-1/3 h-60"
            />
          </div>
        </div>
      </div>
</template>
<script setup>
const route = useRoute();
const router = userRouter();
const limit = ref(2);

const {
  data: arrivals,
  status,
  pending,
  error,
  refresh,
} = await useFetch("https://fakestoreapi.com/products", {
  method: "GET",
  params: {
    limit: 2,
  },
});
</script>