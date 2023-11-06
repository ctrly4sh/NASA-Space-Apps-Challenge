// SpeedControl.tsx
import { useSpeedControl } from '../contexts/SpeedControlContext';
import {Slider} from "@nextui-org/slider";

const SpeedControl = () => {
  const { speedFactor, setSpeedFactor } = useSpeedControl();

  return (
    <div className='absolute top-5 right-5'>
        <Slider
            size="lg"
            label="Speed Control"
            step={0.01}
            maxValue={5}
            minValue={0}
            aria-label="Speed control"
            defaultValue={speedFactor}
            onChange={(value) => setSpeedFactor(Number(value))}
            className="w-[300px] text-gray-200"
            color='secondary'
        />
    </div>
  );
};

export default SpeedControl;
