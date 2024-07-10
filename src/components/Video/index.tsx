import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Player(props: any) {
  const { item } = props;
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const playerRef = React.useRef();

  useEffect(() => {
    if (inView) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [inView]);

  return (
    <div className="!flex justify-center">
      <div ref={ref} className="w-0 h-0" />
      <video
        ref={playerRef}
        className="w-1/2 aspect-square bg-gray rounded-xl"
        poster={item.view_url}
        controls
      >
        <source src={item.url} />
      </video>
    </div>
  );
}

export default Player;
