import { Link } from "react-router-dom";
import "./BreadCrumbs.css";

function BreadCrumbs(props) {
  let path_names = props.data;
  // convering path_names into bread_crumbs
  const bread_crumbs = [];
  let start = 0;
  for (let i = 0; i < path_names.length; i++) {
    if (path_names[i] === "/") {
      const path = path_names
        .substring(start, i + 1)
        .trim()
        .replace("/", "")
        .toUpperCase();
      bread_crumbs.push(path);
      start = i + 1;
    }
  }

  return (
    <div className="breadcrumbs_hmsapps">
      <ol className="breadCrumbs">
        {bread_crumbs
          ? bread_crumbs.map((path, id) => {
              return (
                <>
                  {/* <Link to={path.toLowerCase()}> */}
                  <li>{path}</li>
                  {/* </Link> */}
                  {/* <span> &#8594;</span> */}
                </>
              );
            })
          : "Loading..."}
      </ol>
    </div>
  );
}

export default BreadCrumbs;
