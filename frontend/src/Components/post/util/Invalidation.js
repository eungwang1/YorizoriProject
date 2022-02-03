export const Invalidation = (data, setPostpostPageState) => {
  if (!data.recipeName) {
    setPostpostPageState(1);
    alert("레시피제목을 입력해주세요.");
    return;
  }
  if (!(data.ingredient_1 && data.ingredientVolume_1)) {
    setPostpostPageState(2);
    alert("재료를 입력해주세요.");
    return;
  }
  if (!((data.orderTimeMin_1 || data.orderTimeSec_1) && data.order_1)) {
    setPostpostPageState(3);
    alert("요리순서 및 시간을 입력해주세요.");
    return;
  }
  if (!(data.servings && data.time && data.diffic)) {
    setPostpostPageState(4);
    alert("요리정보를 모두 선택해주세요");
    return;
  }
  // if (!(data.category && data.material && data.condition && data.cook)) {
  //   setPostpostPageState(4);
  //   alert("카테고리를 모두 선택해주세요.");
  //   return;
  // }
};
