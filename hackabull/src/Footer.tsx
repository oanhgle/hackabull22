import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
    return <>
       <footer className="footer py-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-12 text-center">
                <h2><small className="small-text">Speak with someone today</small></h2>
                <a href="tel:8002738255" className="btn custom-btn custom-btn-bg">800-273-8255</a>
                </div>
            </div>
        </div>
    </footer>
    </>
}