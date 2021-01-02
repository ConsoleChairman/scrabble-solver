import React, { FunctionComponent, SVGAttributes } from 'react';

interface Props {
  className?: string;
  duration?: SVGAttributes<SVGAnimateElement>['dur'];
  size?: number;
}

const Spinner: FunctionComponent<Props> = ({ className, duration = '2s', size = 50 }) => {
  const sharedProps = {
    calcMode: 'spline',
    dur: duration,
    keySplines: '0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1',
    keyTimes: '0;0.25;0.5;0.75;1',
    repeatCount: 'indefinite',
  };

  return (
    <svg
      className={className}
      height={size}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="84" cy="50" r="1.64154" fill="currentColor">
        <animate {...sharedProps} attributeName="r" values="10;0;0;0;0" begin="0s" />
        <animate {...sharedProps} attributeName="cx" values="84;84;84;84;84" begin="0s" />
      </circle>
      <circle cx="78.4188" cy="50" r="10" fill="currentColor">
        <animate {...sharedProps} attributeName="r" values="0;10;10;10;0" begin="-1s" />
        <animate {...sharedProps} attributeName="cx" values="16;16;50;84;84" begin="-1s" />
      </circle>
      <circle cx="44.4188" cy="50" r="10" fill="currentColor">
        <animate {...sharedProps} attributeName="r" values="0;10;10;10;0" begin="-0.5s" />
        <animate {...sharedProps} attributeName="cx" values="16;16;50;84;84" begin="-0.5s" />
      </circle>
      <circle cx="16" cy="50" r="8.35846" fill="currentColor">
        <animate {...sharedProps} attributeName="r" values="0;10;10;10;0" begin="0s" />
        <animate {...sharedProps} attributeName="cx" values="16;16;50;84;84" begin="0s" />
      </circle>
      <circle cx="16" cy="50" r="0" fill="currentColor">
        <animate {...sharedProps} attributeName="r" values="0;0;10;10;10" begin="0s" />
        <animate {...sharedProps} attributeName="cx" values="16;16;16;50;84" begin="0s" />
      </circle>
    </svg>
  );
};

export default Spinner;
