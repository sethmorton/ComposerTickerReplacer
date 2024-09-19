export interface ReplacedTicker {
	originalTicker: string;
	replacementTicker: string;
	isIndividualAsset: boolean;
	approved?: boolean;
	denied?: boolean;
	correlation?: number;
	editing?: boolean;
}

export interface ComposerData {
	NEW_COMPOSER_CODE: string;
	REPLACED_TICKERS: ReplacedTicker[];
}
