import React, { useEffect, useState } from "react";
import { Card, Pagination, Spinner } from "react-bootstrap";
import { useAuth } from "../../moduls/Auth";
import starI from "../../media/icons/star.svg";
import { API } from "../../utils/API";
import { numberFormatWithRp } from "../../utils/numberFormat";
import { Link, useLocation } from "react-router-dom";
import SideFilter from "./components/SideFilter";

function ProductList() {
  const { state } = useLocation();
  const { currentUser } = useAuth();
  const [limit, setLimit] = useState(12);
  const [range, setRange] = useState([0, 2250000]);
  const [order, setOrder] = useState("product_name,ASC");
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          AUTHORIZATION: `Bearer ${currentUser.token}`,
        },
        params: {
          keyword: state?.search || "",
          price: `${range[0]},${range[1]}`,
          page: 1,
          limit: limit,
          order: order,
        },
      };
      const res = await API.get("product", config);
      const data = res.data.data.list;

      setDataProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, limit, order, range]);

  const arrStar = [1, 2, 3, 4, 5];
  return (
    <div className="row">
      <div className="col-3">
        <SideFilter range={range} setRange={setRange} />
      </div>
      <div className="col-9 p-0">
        <div className="d-flex justify-content-between mb-3 fs-7 text-muted">
          <div>
            <span className="">Menampilkan</span>
            <select
              className="text-muted border border-1 bg-light  pe-1 mx-2"
              defaultValue={limit}
              onChange={(e: any) => setLimit(e.target.value)}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
            <span className=" me-2">dari 132</span>
          </div>
          <div>
            <span className=" me-2">Urutkan</span>
            <select
              defaultValue={order}
              onClick={(e: any) => setOrder(e.target.value)}
              className="text-muted border border-1 bg-light pe-2"
            >
              <option value="product_name,ASC">Nama Produk</option>
              <option value="price,ASC">Harga</option>
              <option value="date,DESC">Terbaru</option>
            </select>
          </div>
        </div>
        <div className="row gy-3" style={{ minHeight: "40vh" }}>
          {dataProduct[0] ? (
            dataProduct?.map((val: any, index: number) => {
              const imgSrc = val?.images.find(
                (el: any) => el.is_primary === 1
              )?.image_url;

              return (
                <div className="col-md-4 col-sm-12 px-1" key={index}>
                  <Card>
                    <Link
                      to={"/product-detail"}
                      state={val}
                      className="text-decoration-none"
                    >
                      <Card.Body className="d-flex flex-column align-items-center">
                        <div style={{ maxWidth: "250px", maxHeight: "250px" }}>
                          <img
                            src={imgSrc}
                            alt="prod"
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div className="text-center d-flex flex-column mt-3 w-100">
                          <span
                            className="fs-6 fw-bold text-secondary text-truncate"
                            style={{ maxWidth: "100%" }}
                          >
                            {val?.name}
                          </span>
                          <span
                            className="fs-7 text-secondary text-truncate"
                            style={{ maxWidth: "100%" }}
                          >
                            {val?.product_type?.name}
                          </span>
                          <div>
                            {arrStar.map((va: any, i: number) => (
                              <img
                                src={starI}
                                alt="star"
                                height={"100%"}
                                width="10px"
                                className="me-1"
                                key={i}
                              />
                            ))}
                            <span className="fs-7 text-secondary">(7)</span>
                          </div>
                          <span className="fs-7 fw-bold text-primary">
                            {numberFormatWithRp(val?.price)}
                          </span>
                        </div>
                      </Card.Body>
                    </Link>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="text-muted d-flex flex-column align-items-center mt-5">
              {isLoading ? (
                <Spinner></Spinner>
              ) : (
                <>
                  <i className="fa fa-archive fa-3x"></i>
                  <span className="mt-3 fs-6">No Data</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item active>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
