import { useFormik } from 'formik';
import React from 'react'
import style from './auth.module.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { dangNhapAction } from '../../redux/action/movieAction';

export default function Login() {
    let dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: ""
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được để trống'),
            matKhau: Yup.string().required('Mật khẩu không được để trống')
        }),
        onSubmit: values => {
            let dangNhap = dangNhapAction(values)
            dispatch(dangNhap)
            console.log(values)
        },
    });
    return (
        <section>
            <div className={style.formBox}>
                <div className="form-value">
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className={style.titleReg}>Đăng Nhập</h2>
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
                        <button className={style.btnAuth} type="submit" style={{ marginTop: '20px' }}>Đăng Nhập</button>
                        <div className={style.btnChange}>
                            <p>Bạn chưa có tài khoản? <NavLink to='/register'><a className='text-warning ml-2 font-weight-bold' style={{ textDecoration: 'none' }} href="#"> ĐĂNG KÝ NGAY!</a></NavLink> </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}
