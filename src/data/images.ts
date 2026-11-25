/// <reference types="vite/client" />

// Art-directed concept photography (optimised local assets)
import hero from "../assets/img/hero.jpg";
import interior from "../assets/img/interior.jpg";
import pShoeBlack from "../assets/img/p-shoe-black.jpg";
import pShoeStrap from "../assets/img/p-shoe-strap.jpg";
import pShoeNavy from "../assets/img/p-shoe-navy.jpg";
import pInsoles from "../assets/img/p-insoles.jpg";
import pInsolesGrey from "../assets/img/p-insoles-grey.jpg";
import pOrthotic from "../assets/img/p-orthotic.jpg";
import pOrthoticSingle from "../assets/img/p-orthotic-single.jpg";
import pCustomInsert from "../assets/img/p-custom-insert.jpg";
import pCustomImpression from "../assets/img/p-custom-impression.jpg";
import pStockings from "../assets/img/p-stockings.jpg";
import pSleeve from "../assets/img/p-sleeve.jpg";
import wShoeNavy from "../assets/img/w-shoe-navy.jpg";
import wOrthotic from "../assets/img/w-orthotic.jpg";
import wCustom from "../assets/img/w-custom.jpg";
import wStockings from "../assets/img/w-stockings.jpg";

// Licensed stock photography (Pexels)
const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const img = {
  hero,
  interior,
  pShoeBlack,
  pShoeStrap,
  pShoeNavy,
  pInsoles,
  pInsolesGrey,
  pOrthotic,
  pOrthoticSingle,
  pCustomInsert,
  pCustomImpression,
  pStockings,
  pSleeve,
  wShoeNavy,
  wOrthotic,
  wCustom,
  wStockings,
  glucoseMeter: px(17072090),
  glucoseLancets: px(6303715),
  glucoseHands: px(6303712),
  knitGarment: px(34663459),
  shoeLasts: px(3913028),
};
