import { screens } from "../handleFile/Variables";

function Navbar({ changeMode }) {
  return (
    <nav
      className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
      id="mainNav"
    >
      <div className="container">
        <button className="navbar-brand nav-link">Hutech phân công</button>
        <button
          className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <button
                className="nav-link py-3 px-0 px-lg-3 rounded"
                onClick={() => changeMode(screens.CheckFile)}
              >
                Kiểm tra file
              </button>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <button
                className="nav-link py-3 px-0 px-lg-3 rounded"
                onClick={() => changeMode(screens.PhanCongGV)}
              >
                Phân công giảng viên
              </button>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <button
                className="nav-link py-3 px-0 px-lg-3 rounded"
                onClick={() => changeMode(screens.SaveFile)}
              >
                Lưu file
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
