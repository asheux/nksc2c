import { connect } from "react-redux";

import PublicPage from "src/components/PublicPage";
import { nkscontributorAction } from "src/redux/actions/nkscontributor";
import { nksNotebooksAction } from "src/redux/actions/nksnotebooks";

const mapStateToProps = state => ({
  nkscontributor: state.nkscontributor,
  nksnotebooks: state.nksnotebooks,
});
export default connect(mapStateToProps, { nkscontributorAction, nksNotebooksAction })(PublicPage);
