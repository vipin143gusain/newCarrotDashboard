// /stories/pages/home.stories.jsx

import CommonModal from "../../components/CommonModal/common_modal";

export default {
  title: "Pages/Home",
  component: CommonModal,
};

export const Modal = () => <CommonModal open={true} />