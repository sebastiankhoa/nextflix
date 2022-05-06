import { atom } from "recoil";

export const ModalState = atom({
	key: "modal",
	default: false,
});

export const VideoState = atom({
	key: "movie",
	default: null,
});
