import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
import {useColorScheme} from 'nativewind';
const BackButton = (props: SvgProps) => {
  const {colorScheme} = useColorScheme();

  return (
    <Svg
      //@ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      {...props}>
      <Path
        fill="none"
        stroke={colorScheme === 'dark' ? 'white' : 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M249.38 336 170 256l79.38-80m-68.35 80H342"
      />
      <Path
        fill="none"
        stroke={colorScheme === 'dark' ? 'white' : 'black'}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
      />
    </Svg>
  );
};
const Memo = memo(BackButton);
export default Memo;
