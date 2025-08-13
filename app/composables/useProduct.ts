export default function useProduct(){
const setStars = (index: number, productRating: float) => {
  return index <= Math.floor(Number(productRating))
    ? "material-symbols:star-rate"
    : index - productRating < 1
      ? "material-symbols:star-half"
      : "material-symbols:star-outline";
};
return{
  setStars
}
}