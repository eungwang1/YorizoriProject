// import { useRecoilValue } from "recoil";
// import { MainImageStateAtom } from "../PostAtom/PostAtom";

export const Invalidation = (data, setPostpostPageState, mainImage) => {
  if (!data.recipeName) {
    setPostpostPageState(1);
    alert("레시피제목을 입력해주세요.");
    return;
  }

  console.log(mainImage.state);

  if (!mainImage.state) {
    setPostpostPageState(1);
    alert("메인이미지는 필수입니다.");
    return;
  }

  if (!data.ingredient[0] || !(data.ingredient[0].ingre_name && data.ingredient[0].ingre_count)) {
    setPostpostPageState(2);
    alert("재료를 입력해주세요.");
    return;
  }

  if (!data.process[0] || !(data.process[0].process_time && data.process[0].txt)) {
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
