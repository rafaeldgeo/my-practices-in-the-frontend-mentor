export default function AttributionFooter(){
    
    const defaultStyle = {
        textAlign: "center",
        marginBlock: ".6rem",
        fontSize: ".6875rem",
    }

    return(
        <div className="attribution" style={defaultStyle}>    
            <p className="attribution__color-label">Challenge by <a className="attribution__color-link" href="https://www.frontendmentor.io/profile/rafaeldgeo" target="_blank" rel="noreferrer noopener">Frontend Mentor</a>. Code by <a className="attribution__color-link" href="https://www.linkedin.com/in/rafaeldgeo" target="_blank" rel="noreferrer noopener">Rafael Dias de Almeida</a>.</p>
        </div>
    );
}
