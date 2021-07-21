import moment from 'moment';
import AppHeader from './AppHeader';
import './App.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const calcVideoSize = () => {
  const { clientWidth } = document.body;
  const height = window.innerHeight;
  const windowRatio = clientWidth / height;
  const videoOrigin = {
    w: 720,
    h: 1280,
    ratio: 720 / 1280,
  };
  const videoPosition = {
    left: 0,
    top: 0,
  };
  const videoSize = {
    w: 0,
    h: 0,
  };

  if (windowRatio > videoOrigin.ratio) {
    videoSize.w = clientWidth;
    videoSize.h = clientWidth / videoOrigin.ratio;
  } else {
    videoSize.w = height * videoOrigin.ratio;
    videoSize.h = height;
  }

  videoPosition.left = (videoSize.w - clientWidth) * -0.5 + 'px';
  videoPosition.top = (videoSize.h - height) * -0.5 + 'px';

  return { size: videoSize, style: videoPosition };
};

const numToString = (num, unit) => {
  if (!num) return '';
  if (num < 10) return `0${num} ${unit}`;
  return `${num} ${unit}`;
};

const birthDay = moment().year(2021).month(4).date(15);
const now = moment();
const months = Math.floor(now.diff(birthDay, 'months', true));
const newDay = moment(birthDay).add(months, 'months');
const diffD = now.diff(newDay, 'days');
const weeks = Math.floor(diffD / 7);
const days = weeks ? Math.floor(diffD % 7) : diffD;
const ages = [numToString(months, 'tháng'), numToString(weeks, 'tuần'), numToString(days, 'ngày')];

const filteredAges = ages.filter((x) => !!x).join(', ');

function App() {
  const [hide, setHide] = useState(false);
  const onVideoStart = useCallback(() => {
    setHide(true);
  }, []);
  const [timer, setTimer] = useState(null);
  const { size, style } = useMemo(calcVideoSize, [timer]);
  useEffect(() => {
    const update = () => setTimer(new Date());
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);
  const videoRef = useRef(null);

  return (
    <div className="App">
      <video
        ref={videoRef}
        onPlay={onVideoStart}
        muted loop width={size.w} height={size.h}
        style={style} autoPlay preload="true">
        <source src="video/nhim.MOV" type="video/mp4" />
      </video>
      <AppHeader videoRef={videoRef} hide={hide} birthDay={birthDay.format('DD/MM/yyyy')} age={filteredAges} />
    </div>
  );
}

export default App;
