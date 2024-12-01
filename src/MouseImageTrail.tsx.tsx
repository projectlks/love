import { useAnimate } from "framer-motion";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { FiMousePointer } from "react-icons/fi";
// import imgFormssets from "../assets/imgs/active/1.jpg"
import img1 from "./assets/imgs/active/1.jpg";
import img2 from "./assets/imgs/active/2.jpg";
import img3 from "./assets/imgs/active/3.jpg";
import img4 from "./assets/imgs/active/4.jpg";
import img5 from "./assets/imgs/active/5.jpg";
import img6 from "./assets/imgs/active/6.jpg";
import img7 from "./assets/imgs/active/7.jpg";
import img8 from "./assets/imgs/active/8.jpg";
import img9 from "./assets/imgs/active/9.jpg";
import img10 from "./assets/imgs/active/10.jpg";
import img11 from "./assets/imgs/active/11.jpg";
import img12 from "./assets/imgs/active/12.jpg";
import img13 from "./assets/imgs/active/13.jpg";
import img14 from "./assets/imgs/active/14.jpg";
import img15 from "./assets/imgs/active/15.jpg";
import img16 from "./assets/imgs/active/16.jpg";
import img17 from "./assets/imgs/active/17.jpg";
import img18 from "./assets/imgs/active/18.jpg";
import img19 from "./assets/imgs/active/19.jpg";
import img20 from "./assets/imgs/active/20.jpg";
import img21 from "./assets/imgs/active/21.jpg";

export const Example = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18,
        img19,
        img20,
        img21,
      ]} // All 21 images
    >
      <section className="grid h-screen w-full place-content-center bg-[#f0f8ff]">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          <FiMousePointer />
          <span>Hover me</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}: {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector) as HTMLElement;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}
      
      {images.map((img, index) => (
        <div
          key={index}
          data-mouse-move-index={index}
          className="pointer-events-none absolute left-0 top-0 w-[100px] xl:w-[150px] bg-white shadow  p-2  rounded-md  opacity-0 "
        >
          <img
            src={img}
            alt={`Mouse move image ${index}`}
            className="h-auto w-full "
          />
        </div>
      ))}
    </div>
  );
};

{
  /*        
        <img
          className="pointer-events-none absolute left-0 top-0 h-60 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        /> */
}

// {images.map((img, index) => (
//   <div
//   key={index}
//   data-mouse-move-index={index}
//   className="pointer-events-none absolute left-0 top-0 h-60 w-auto bg-white  p-2 pb-6 rounded-md border border-black  object-cover opacity-0">
//     <img
//       src={img}
//       alt={`Mouse move image ${index}`}
//     className="h-full w-auto "
//     />
//   </div>
// ))}
