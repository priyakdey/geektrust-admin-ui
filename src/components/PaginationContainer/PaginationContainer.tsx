import "./PaginationContainer.css";

interface FooterProps {
  activePage: number;
  totalPages: number;
  setActivePage: (number) => void;
}

const activePageStyle = {
  "color": "#007BFF",
  "backgroundColor": "#FFFFFF"
};

const inActivePageStyle = {
  "color": "#FFFFFF",
  "backgroundColor": "#007BFF"
};

export function PaginationContainer({
                                      activePage,
                                      totalPages,
                                      setActivePage
                                    }: FooterProps) {
  return (
    <div className="App-Footer">
      <button className="delete-selected-btn">Delete Selected</button>
      <div className="pages">
        <button className="jump-btn" disabled={activePage === 1}
                onClick={() => setActivePage(1)}>
          <svg width="24" height="24" viewBox="-5 -5 30 30" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" color="#AFAFAF" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" />
            <path d="M9 18L3 12L9 6" color="#AFAFAF" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" />
          </svg>
        </button>
        <button className="jump-btn"
                disabled={activePage === 1}
                onClick={() => setActivePage(activePage - 1)}>
          <svg width="24" height="24" viewBox="0 -5 30 30" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" color="#AFAFAF" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" />
          </svg>
        </button>
        {
          Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNo) => (
            <button
              className="page-number-btn"
              key={pageNo}
              style={pageNo === activePage ? activePageStyle : inActivePageStyle}
              disabled={pageNo === activePage}
              onClick={() => setActivePage(pageNo)}
            >
              {pageNo}
            </button>
          ))
        }
        <button className="jump-btn"
                disabled={activePage === totalPages}
                onClick={() => setActivePage(activePage + 1)}>
          <svg width="24" height="24" viewBox="0 -5 30 30" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" color="#AFAFAF" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" />
          </svg>
        </button>
        <button className="jump-btn"
                disabled={activePage === totalPages}
                onClick={() => setActivePage(totalPages)}>
          <svg width="24" height="24" viewBox="-5 -5 30 30" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" color="#AFAFAF" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" />
            <path d="M3 18L9 12L3 6" color="#AFAFAF" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}