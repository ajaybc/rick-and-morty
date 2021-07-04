import { Component } from 'react';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{textAlign: 'center'}}>
        <h1>There was an error loading this page</h1>
        <Button size="large" color="primary" onClick={() => window.location.reload()} data-test-id="reload-btn">
          Reload <ReplayIcon />
        </Button>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
