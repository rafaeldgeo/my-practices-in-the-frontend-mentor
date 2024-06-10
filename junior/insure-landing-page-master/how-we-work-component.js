"use strict";

class HowWeWork extends React.Component {

    render(){
        return(
            <div className="how-we-work">
                <p className="how-we-work__announcement">Find out more <br /> about how we work</p>
                <button className="how-we-work__btn" type="button">How we work</button>
            </div>
        )
    }
}

const howWeWork = document.getElementById("work__component");
ReactDOM.render(<HowWeWork />, howWeWork);