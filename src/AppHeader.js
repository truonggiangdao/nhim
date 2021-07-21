import NhimFull from './nhim-full.png';
import Nhim512 from './nhim-512.png';
const { clientWidth } = document.body;

const nhimPng = clientWidth < 1024 ? Nhim512 : NhimFull;

function AppHeader({ birthDay, age, hide }) {
  return (
    <header className="App-header">
      <img src={nhimPng} className={`App-logo ${hide ? 'hide' : ''}`} alt="logo" />
      <p className="title">Nhím</p>
      <p className="sub-title">Đào Kỳ Bảo Vy</p>
      <div className="my-2">
        <span className="lable">Ngày sinh:</span> <span className="content">{birthDay}</span>
      </div>
      <div className="my-2">
        <span className="lable">Tuổi:</span> <span className="content">{age}</span>
      </div>
    </header>
  );
}

export default AppHeader;
