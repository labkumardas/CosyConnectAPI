
import dotenv from 'dotenv';
dotenv.config();


class emailPages {
    constructor() {

    }


    bug_report = (email, description) => {
        const body = `<html>
    
    <head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet">
        <style>
            @media(max-width: 767px) {
                table.col-600 {
                    max-width: unset;
                    width: 90%;
                    margin: 0 auto !important;
                    border: 0 !important;
                }
    
                table.main-table {
                    height: 100%;
                }
    
                table.col-600 table tr td {
                    line-height: 30% !important;
                    height: unset !important;
                }
    
                table.col-600 tbody tr td {
                    font-size: 12px !important;
                    padding: 0 10px;
                }
    
                table.col-600 tbody tr td a img {
                    margin: 20px 0 0 !important;
                }
    
                .copyright {
                    padding: 12px;
                }
    
                html body .copyright tbody tr td {
                    line-height: 20px !important;
                }
    
                .thank-sec table.col-600 tr td img {
                    width: 70%;
                }
            }
        </style>
    
    <body>
    
        <table class="main-table" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
            style="padding: 50px 0; background-color: #F5F5F5;">
    
    
            <!-- START HEADER/BANNER -->
    
            <tbody>
                <tr>
                    <td align="center">
                        <table class="col-600 thank-sec" width="600" border="0" align="center" cellpadding="0"
                            cellspacing="0" style="background-color:#02387B ;">
                            <tr>
                                <td align="center" style="line-height: 0px; padding-top: 25px">
                                    <img style="margin-top: -31px;display:block;line-height:0px;font-size:0px;border:0px;  width: 70px; margin-bottom: 10px;"
                                        src="${process.env.BASE_URL}/pages/logo.png" width="" height="" alt="logo">
                                </td>
                            </tr>
                            <tbody>
                                <tr>
                                    <td align="center" valign="top" height=" 136""="">
                      <table class=" col-600" width="600" height="136" border="0" align="center" cellpadding="0"
                                        cellspacing="0">
    
                            <tbody style="background-color: #02387B;">
                                <td align="center" style="line-height: 0px;">
                                    <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                        src="${process.env.BASE_URL}/pages/icon.png" width="35%" height="" alt="logo">
                                </td>
    
    
                                <tr>
                                    <td align="center"
                                        style="font-family: 'Open Sans', sans-serif; font-size:16px; color:#ffffff; line-height:20px; font-weight: 700;">
                                        Privacy Policy
                                    </td>
    
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        </td>
        </tr>
    
    
        <!-- END HEADER/BANNER -->
    
    
    
        <!-- START 3 BOX SHOWCASE -->
    
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                    style="background: #fff; margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
    
                        <tr>
                            <td align="center"
                                style="font-family: 'Open Sans', sans-serif; font-size:18px; color:#534F4F; line-height:18px;">
                                Hello, </td>
                        </tr>
    
                        <tr>
                            <td height="10"></td>
                        </tr>

                        <tr>
                            <td align="center"
                                style="font-family: 'Open Sans', sans-serif; font-size:16px; color:#534F4F; line-height:26px; margin: 0 10px; padding: 0 20px">
                                Change In Privacy Policy <b>Cosy Connect</b>.
                                Please click on the below link.
                            </td>
                        </tr>
                        <tr>
                            <td height="25"></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="button" style="height: 50px; text-align: center;">
                                    ${description}  
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td height="15"></td>
                        </tr>
                        <tr>
                            <td align="center"
                                style="font-family: 'Open Sans', sans-serif; font-size:14px; color:#000; font-weight: 500; line-height:14px; margin: 0 10px;">
                                Thank you!
                            </td>
                        </tr>
                        <tr>
                            <td align="center"
                                style="font-family: 'Open Sans', sans-serif; font-size:14px; color:#000; font-weight: 500; line-height:40px; margin:10px;">
                                Best regards,
                            </td>
                        </tr>
                        <tr>
                            <td align="center"
                                style="font-family: 'Open Sans', sans-serif; font-size:15px; color:#000; font-weight: 500; line-height:40px; margin: 10px;">
                               Cosy Connect
                            </td>
                        </tr>
                        <tr>
                            <td height="35"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
    
        </tr>
    
        <!-- Start Footer -->
    
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                    style="background: #D9D9E6; margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td align="center" bgcolor="#D9D9E6" height="161">
                                <table class="col-600" width="600" border="0" align="center" cellpadding="0"
                                    cellspacing="0">
                                    <tbody style="text-align: center;">
                                        <tr>
                                            <td height="25"></td>
                                        </tr>
    
                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Open Sans',  sans-serif; font-size:14px; font-weight: 700; line-height: 16px; color:#02387B;">
                                                Get In Touch
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Open Sans',  sans-serif; font-size:12px; font-weight: 400; line-height: 12px; color:#534F4F;">
                                                <a href="tel:+2348111669663"
                                                    style="display: inline-block;font-family: 'Open Sans',  sans-serif; font-size:12px; font-weight: 400; line-height: 30px; text-decoration: none;color:#534F4F;">+2348111669663</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Open Sans',  sans-serif; font-size:12px; font-weight: 400; line-height: 12px; color:#534F4F;">
                                                <a href="mailto:cosyconnect@gmail.com"
                                                style="display: inline-block;font-family: 'Open Sans',  sans-serif; font-size:12px; font-weight: 400; line-height: 8px; text-decoration: none;color:#534F4F;">
                                                CosyConnect@gmail.com</a>
                                            </td>
                                        </tr>
    
                                        <tr>
                                            <td height="15"></td>
                                        </tr>
    
                                        <tr style="display: inline-block;margin: 0 5px;">
                                        <td align="center">
                                           <a href=" "
                                              style="display: inline-block;">
                                              <img src="${process.env.BASE_URL}/pages/fb-icon.png">
                                           </a>
                                        </td>
                                     </tr>
                                     <tr style="display: inline-block;margin: 0 5px;">
                                        <td align="center">
                                           <a href="https://www.linkedin.com/feed/" style="display: inline-block;">
                                              <img src="${process.env.BASE_URL}/pages/linkedin.png">
                                           </a>
                                        </td>
                                     </tr>
                                     <tr style="display: inline-block;margin: 0 5px;">
                                        <td align="center">
                                           <a href=" ">
                                              <img src="${process.env.BASE_URL}/pages/insta.png">
                                           </a>
                                        </td>
                                     </tr>
                                     <tr style="display: inline-block;margin: 0 5px;">
                                        <td align="center">
                                           <a href=" " style="display: inline-block;">
                                              <img src="${process.env.BASE_URL}/pages/twitter.png">
                                           </a>
                                        </td>
                                     </tr>
                                        <tr>
                                            <td height="25"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    
        <tr>
            <td align="center">
                <table class="col-600 copyright" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                    style="background: #02387B; margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Open Sans', sans-serif; font-size:12px; color:#fff; line-height:35px;">
                                                Copyrights © Company All Rights Reserved
                                            </td>
                                        </tr>            
                    </tbody>
                </table>
            </td>
            </tbody>
            </table>
            </td>
        </tr>
    
        <!-- END FOOTER -->
    
    
    
        </tbody>
        </table>
    
    </body>
    </head>
    
    </html>`;
        return {
            // to: email,
            to: process.env.NODEMAILER_FROM_ADDRESS,
            // from: process.env.NODEMAILER_ADDRESS,
            from: process.env.SENDGRID_FROM_ADDRESS,
            subject: "Bug Report",
            text: body,
            html: `${body}`,
        };
    }
}

export default new emailPages();