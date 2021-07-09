import { Helmet } from "react-helmet-async";

function PageTitle({titleName}){
    return (
        <Helmet>
            <title>{`${titleName} | Instaclone`}</title>
        </Helmet>
    )
}

export default PageTitle;