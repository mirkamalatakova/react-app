import React from 'react';
import Header from 'components/Header';

class AppComponent extends React.Component {

    render() {
        return (
            <div className="container">
              <Header />
              {this.props.children}
            </div>

        );
    }
}

export default AppComponent;