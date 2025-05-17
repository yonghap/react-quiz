import {Platforms} from "@/constants/platforms";

// 공통함수
export const formatPrice = (price:number) => {
	if (!price) {
		return 0
	}
	const newPirce = Number(String(price).slice(0, -2))
	return newPirce.toLocaleString('ko-KR')
}

export function convertSlugToPlatform(slug: string): Platforms | null {
	const mapping: Record<string, Platforms> = {
		pc: Platforms.PC,
		playstation5: Platforms.PS,
		"xbox-one": Platforms.Xbox,
		"nintendo-switch": Platforms.NS
	};

	return mapping[slug.toLowerCase()] || null;
}