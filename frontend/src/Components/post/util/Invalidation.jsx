// import { MainImageStateAtom } from "../PostAtom/PostAtom";
import { InvalidationAtom } from "../PostAtom/PostAtom";
import { useRecoilState } from "recoil";
import swal from "sweetalert";

export const Invalidation = (data, setPostpostPageState, mainImage, setInvalidationState) => {
  if (!data.recipeName) {
    setPostpostPageState(1);
    swal("", "레시피제목을 입력해주세요.", "info");
    return;
  }

  if (!mainImage.state) {
    setPostpostPageState(1);
    swal("", "메인이미지는 필수입니다.", "info");
    return;
  }

  if (!data.desc) {
    setPostpostPageState(1);
    swal("", "레시피소개를 입력해주세요.", "info");
    return;
  }

  if (!data.ingredient[0] || !(data.ingredient[0].ingreName && data.ingredient[0].ingreCount)) {
    setPostpostPageState(2);
    swal("", "재료를 입력해주세요.", "info");
    return;
  }

  if (!data.seasoning[0] || !(data.seasoning[0].ingreName && data.seasoning[0].ingreCount)) {
    setPostpostPageState(2);
    swal("", "양념을 입력해주세요.", "info");
    return;
  }

  if (!data.process[0] || !(data.process[0].processTime && data.process[0].explain)) {
    setPostpostPageState(3);
    swal("", "요리순서 및 시간을 입력해주세요.", "info");
    return;
  }

  if (!(data.servings && data.time && data.diffic)) {
    setPostpostPageState(4);
    swal("", "요리정보를 모두 선택해주세요", "info");
    return;
  }
  if (!(data.category && data.material && data.condition && data.cook)) {
    setPostpostPageState(4);
    swal("", "카테고리를 모두 선택해주세요.", "info");
    return;
  }
  setInvalidationState(true);
};
