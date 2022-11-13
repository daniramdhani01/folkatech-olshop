import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { numberFormatWithRp } from "../../utils/numberFormat";
import starI from "../../media/icons/star.svg";
// import heartI from "../../media/icons/heart-red.svg";
import { API } from "../../utils/API";
import { useAuth } from "../../moduls/Auth";

function ProductDetail() {
  const { state: product } = useLocation();
  const { currentUser } = useAuth();
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [islove, setIslove] = useState(false);
  const [imglist, setImglist] = useState([""]);
  const [showimg, setShowimg] = useState(0);

  const arrStar = [1, 2, 3, 4, 5];

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          AUTHORIZATION: `Bearer ${currentUser.token}`,
        },
        params: {
          page: 1,
          limit: 3,
          order: "product_name,ASC",
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
  }, []);

  useEffect(() => {
    const img = product.images
      .sort((a: any, b: any) => b.is_primary - a.is_primary)
      .map((el: any) => el.image_url);
    setImglist(img);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [product]);

  return (
    <Container className="px-5 mb-5">
      <Row className="px-5">
        <Col md={6} sm={12}>
          <div className="p-2 border border-1">
            <img src={imglist[showimg]} alt="product" className="w-100" />
          </div>
          <div className="row p-2 d-flex align-items-center justify-content-center">
            {/* <div className="row p-2 "> */}
            {product?.images.map((el: any, index: number, self: any) => {
              const isStart = index === 0;
              return (
                <div className="col-4 p-1 position-relative" key={index}>
                  {self.length > 1 && (
                    <button
                      onClick={() =>
                        setShowimg((prev: any) =>
                          isStart
                            ? prev === 0
                              ? prev
                              : prev - 1
                            : prev === self.length - 1
                            ? prev
                            : prev + 1
                        )
                      }
                      className={`border-0 position-absolute top-50 translate-middle 
                        ${isStart ? "start-0" : "start-100"}`}
                      style={{
                        borderRadius: "100%",
                        width: "35px",
                        height: "35px",
                        backgroundColor: "#E2E2E2",
                      }}
                    >
                      <i
                        className={`fa ${
                          isStart ? "fa-chevron-left" : "fa-chevron-right"
                        } fs-lg`}
                      ></i>
                    </button>
                  )}
                  <div
                    className={`p-2 border border-1 ${
                      showimg === index && self.length > 1 && "border-primary"
                    }`}
                  >
                    <img src={el.image_url} alt="product" className="w-100" />
                  </div>
                </div>
              );
            })}
          </div>
        </Col>

        <Col md={6} sm={12} className="text-muted">
          <div className="fs-5 fw-bold mb-2">{product?.name}</div>
          <div className="">{product?.product_type?.name}</div>
          <div>
            {arrStar.map((va: any, i: number) => (
              <img
                src={starI}
                alt="star"
                width="10px"
                className="me-1"
                key={i}
              />
            ))}{" "}
            <span className="text-muted fs-7">(7)</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-primary fw-bold">
              {numberFormatWithRp(product?.price)}
            </span>
            <span className="text-info fs-7">
              <i className="fa fa-check-square-o"></i> Tersedia
            </span>
          </div>
          <div className="d-flex flex-wrap justify-content-between mt-3">
            <div>
              <button
                className="py-2 px-3 bg-transparent text-muted border border-muted"
                onClick={() =>
                  setCount((prev) => (prev <= 1 ? prev : prev - 1))
                }
              >
                <i className="fa fa-minus"></i>
              </button>
              <span className="py-2 px-3 text-muted border border-muted mx-1">
                {count}
              </span>
              <button
                className="py-2 px-3 bg-transparent text-muted border border-muted"
                onClick={() => setCount((prev) => prev + 1)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
            <Button
              className="rounded-0 text-white"
              onClick={() => setCount(1)}
            >
              TAMBAH KE KERANJANG
            </Button>
            <button
              className="border-0 bg-muted text-primary px-3"
              onClick={() => setIslove((prev) => !prev)}
            >
              <i
                className={`fa ${!islove ? "fa-heart-o" : "fa-heart"} fa-2x`}
              ></i>
            </button>
          </div>
          <div className="text-muted mt-3">{product?.short_description}</div>
        </Col>

        <Col sm={12}>
          <div className="mt-5 d-flex justify-content-center">
            <div className="text-center" style={{ width: "250px" }}>
              <Button className="p-0 m-0 bg-transparent rounded-0 border-0 text-primary border-1 fw-bold">
                DESKRIPSI
              </Button>
              <hr className="border border-2 border-primary opacity-100 rounded text-primary bg-primary" />
            </div>
            <div className="text-center" style={{ width: "250px" }}>
              <Button
                className="p-0 m-0 bg-transparent rounded-0 border-0 text-muted border-1 fw-bold"
                disabled={true}
              >
                INFORMASI
              </Button>
            </div>
          </div>
          <div className="text-muted">{product?.description}</div>
        </Col>
        <Col sm={12}>
          <div className="mt-5 mb-4 d-flex justify-content-center">
            <div className="text-center" style={{ width: "250px" }}>
              <span className="text-secondary fw-bold">
                REKOMENDASI UNTUK ANDA
              </span>
              <hr className="border border-2 border-primary opacity-100 rounded text-primary bg-primary w-50 mx-auto" />
            </div>
          </div>
          <div>
            <div className="row gy-3">
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
                            <div
                              style={{ maxWidth: "250px", maxHeight: "250px" }}
                            >
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
