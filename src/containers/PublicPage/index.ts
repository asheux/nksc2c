import { connect } from "react-redux";

import PublicPage from "src/components/PublicPage";
import { nkscontributorAction } from "src/redux/actions/nkscontributor";
import { nksNotebooksAction } from "src/redux/actions/nksnotebooks";
import { uploadnksnbAction } from "src/redux/actions/nksuploadnb";

const mapStateToProps = (state) => ({
  nkscontributor: state.nkscontributor,
  nksnotebooks: state.nksnotebooks,
  nksc2cupload: state.uploadnksnb,
});
export default connect(mapStateToProps, {
  nkscontributorAction,
  nksNotebooksAction,
  uploadnksnbAction,
})(PublicPage);
