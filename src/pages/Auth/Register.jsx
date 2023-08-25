import { useFormik } from 'formik';
import React from 'react'
import style from'./auth.module.css';
import * as Yup from 'yup';
import { dangKyAction } from '../../redux/action/movieAction';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

export default function Register() {
    let dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            repeatPass: '',
            email: "",
            soDt: "",
            maNhom: "",
            maLoaiNguoiDung: "",
            hoTen: ""
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được để trống'),
            matKhau: Yup.string().required('Mật khẩu không được để trống'),
            repeatPass: Yup.string().oneOf([Yup.ref('matKhau'), null], 'Mật khẩu không khớp'),
            email: Yup.string().required('Email không được để trống').email("Email không đúng định dạng"),
            soDt: Yup.string().required('Số điện thoại không được để trống'),
            hoTen: Yup.string().required('Họ tên không được để trống'),
        }),
        onSubmit: values => {
            let dangKy = dangKyAction(values)
            dispatch(dangKy)
        },
    });
    return (
        <section>
            <div className={style.formBox}>
                <div className="form-value">
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className={style.titleReg}>Đăng Ký</h2>
                        <div className={style.inputBox}>
                            <ion-icon name="person-circle-outline" />
                            <input className={style.boxInput} type="text" name='taiKhoan' onChange={formik.handleChange}
                                value={formik.values.taiKhoan} onBlur={formik.handleBlur} />
                            <label className={style.labelText} htmlFor="true">Tài khoản</label>
                        </div>
                        {formik.errors.taiKhoan ? (
                            <div className={style.errorMess}>{formik.errors.taiKhoan}</div>
                        ) : null}
                        <div className={style.inputBox}>
                            <ion-icon name="lock-closed-outline" />
                            <input className={style.boxInput} type="password" name='matKhau' onChange={formik.handleChange}
                                value={formik.values.matKhau} onBlur={formik.handleBlur} />
                            <label className={style.labelText} htmlFor="true">Mật khẩu</label>
                        </div>
                        {formik.errors.matKhau ? (
                            <div className={style.errorMess}>{formik.errors.matKhau}</div>
                        ) : null}
                        <div className={style.inputBox}>
                            <ion-icon name="lock-closed-outline" />
                            <input className={style.boxInput} type="password" name='repeatPass' onChange={formik.handleChange}
                                value={formik.values.repeatPass} onBlur={formik.handleBlur} />
                            <label className={style.labelText} htmlFor="true">Nhập lại mật khẩu</label>
                        </div>
                        {formik.errors.repeatPass ? (
                            <div className={style.errorMess}>{formik.errors.repeatPass}</div>
                        ) : null}
                        <div className={style.inputBox}>
                            <ion-icon name="mail-outline" />
                            <input className={style.boxInput} type="text" name='email' onChange={formik.handleChange}
                                value={formik.values.email} onBlur={formik.handleBlur}/>
                            <label className={style.labelText} htmlFor="true">Email</label>
                        </div>
                        {formik.errors.email ? (
                            <div className={style.errorMess}>{formik.errors.email}</div>
                        ) : null}
                        <div className={style.inputBox}>
                            <ion-icon name="call-outline" />
                            <input className={style.boxInput} type="text" name='soDt' onChange={formik.handleChange}
                                value={formik.values.soDt} onBlur={formik.handleBlur}/>
                            <label className={style.labelText} htmlFor="true">Số điện thoại</label>
                        </div>
                        {formik.errors.soDt ? (
                            <div className={style.errorMess}>{formik.errors.soDt}</div>
                        ) : null}
                        <div className={style.inputBox}>
                            <ion-icon name="person-outline" />
                            <input className={style.boxInput} type="text" name='hoTen' onChange={formik.handleChange}
                                value={formik.values.hoTen} onBlur={formik.handleBlur} />
                            <label className={style.labelText} htmlFor="true">Họ và tên</label>
                        </div>
                        {formik.errors.hoTen ? (
                            <div className={style.errorMess}>{formik.errors.hoTen}</div>
                        ) : null}
                        <button className={style.btnAuth} type="submit" style={{ marginTop: '20px' }}>Đăng Ký</button>
                        <div className={style.btnChange}>
                            <p>Bạn đã có tài khoản? <NavLink to='/login'><a className='text-warning ml-2 font-weight-bold' style={{textDecoration:'none'}} href="#"> ĐĂNG NHẬP</a></NavLink> </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}
