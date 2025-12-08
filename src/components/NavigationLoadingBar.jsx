import { useEffect, useRef } from "react";
import { useNavigation } from "react-router";
import LoadingBar from "react-top-loading-bar";

export function NavigationLoadingBar() {
  const navigation = useNavigation();
  const ref = useRef(null);

  useEffect(() => {
    if (navigation.state === "loading" || navigation.state === "submitting") {
      ref.current?.continuousStart();
    }

    if (navigation.state === "idle") {
      ref.current?.complete();
    }
  }, [navigation.state]);

  return (
    <LoadingBar
      color="orange"
      ref={ref}
      shadow={false}
      height={5}
      transitionTime={100}
      waitingTime={300}
    />
  );
}
