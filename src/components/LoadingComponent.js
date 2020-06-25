import React from 'react';

export const Loading = () => {
    return(
        <div className = "col-12">
            <span className = "fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>  {/*fa-pulse causes rotation..fa-3x: 3 times speed, fa-fw: forward spinning*/}
            <p>Loading ... </p>
        </div>
    )
}