export function DetailsView(props) {

    // loading state
    if (props.loading) {
        return (
            <div className="detail-container">
                <p className="detail-loading">Loading card details...</p>
            </div>
        );
    }

    // error state
    if (props.error) {
        return (
            <div className="detail-container">
                <p className="detail-error">Error: {props.error}</p>
            </div>
        );
    }

    if (!props.cardData) {
        return (
            <div className="detail-container">
                <p className="detail-loading">Loading...</p>
            </div>
        );
    }

    // render card details
    return (
        <div className="detail-container">
            <div className="detail-content">

                {/* Card image */}
                <div className="detail-image-section">
                    {props.cardImage ? (
                        <img
                            className="detail-card-image"
                            src={props.cardImage}
                            alt={props.cardData.name}
                        />
                    ) : (
                        <div className="detail-card-placeholder">
                            <div className="detail-placeholder-symbol">&#9734;</div>
                            <span className="detail-placeholder-text">{props.cardData.name}</span>
                        </div>
                    )}
                </div>

                {/* Card information */}
                <div className="detail-info-section">

                    {/* Card name */}
                    <h1 className="detail-card-name">{props.cardData.name}</h1>

                    {/* Card type */}
                    <p className="detail-card-type">
                        {props.cardData.type === "major" ? "Major Arcana" : "Minor Arcana"}
                        {" · "}
                        {props.cardData.name_short}
                    </p>

                    {/* Upright meaning */}
                    <div className="detail-meaning-block">
                        <h3 className="detail-meaning-title up">&#9788; Upright</h3>
                        <p className="detail-meaning-text">{props.cardData.meaning_up}</p>
                    </div>

                    {/* Reversed meaning */}
                    <div className="detail-meaning-block">
                        <h3 className="detail-meaning-title rev">&#9789; Reversed</h3>
                        <p className="detail-meaning-text">{props.cardData.meaning_rev}</p>
                    </div>

                    {/* Description */}
                    <div className="detail-desc-block">
                        <h3 className="detail-desc-title">&#128220; Description</h3>
                        <p className="detail-desc-text">{props.cardData.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
