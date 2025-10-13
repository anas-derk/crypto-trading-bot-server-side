const { join } = require("path");

const { readFileSync } = require("fs");

// Import EJS template processing function
const { compile } = require("ejs");

// Import module to generate verification codes
const CodeGenerator = require("node-code-generator");

const { getPasswordForBussinessEmail } = require("../../repositories/global_passwords");

const { emailsUtils } = require("../../utils");

async function sendVerificationCodeToUserEmail(email) {
    const result = await getPasswordForBussinessEmail(process.env.BUSSINESS_EMAIL);
    if (!result.error) {
        const generator = new CodeGenerator();
        const generatedCode = generator.generateCodes("####")[0];
        const templateContent = readFileSync(join(__dirname, "..", "..", "assets", "email_templates", "email_template.ejs"), "utf-8");
        const compiledTemplate = compile(templateContent);
        const htmlContentAfterCompilingEjsTemplateFile = compiledTemplate({ generatedCode });
        const mailConfigurations = {
            from: `${process.env.WEBSITE_NAME} <${process.env.BUSSINESS_EMAIL}>`,
            to: email,
            subject: `رمز التحقق من الحساب على <${process.env.BUSSINESS_EMAIL}>`,
            html: htmlContentAfterCompilingEjsTemplateFile,
        };
        return new Promise((resolve, reject) => {
            emailsUtils.getTransporter(result.data).sendMail(mailConfigurations, function (error, info) {
                if (error) reject(error);
                resolve({
                    msg: "Sending Confirmation Code Process Has Been Successfully !!",
                    error: false,
                    data: generatedCode,
                });
            });
        });
    }
    return result;
}

async function sendCongratulationsOnCreatingNewAccountEmail(email, language) {
    const result = await getPasswordForBussinessEmail(process.env.BUSSINESS_EMAIL);
    if (!result.error) {
        const templateContent = readFileSync(join(__dirname, "..", "..", "assets", "email_templates", "congratulations_creating_new_account.ejs"), "utf-8");
        const compiledTemplate = compile(templateContent);
        const htmlContentAfterCompilingEjsTemplateFile = compiledTemplate({ email, language });
        return new Promise((resolve, reject) => {
            emailsUtils.getTransporter(result.data).sendMail({
                from: `${process.env.WEBSITE_NAME} <${process.env.BUSSINESS_EMAIL}>`,
                to: email,
                subject: `مرحباً بك في ${process.env.WEBSITE_NAME}`,
                html: htmlContentAfterCompilingEjsTemplateFile,
            }, function (error, info) {
                if (error) reject(error);
                resolve({
                    msg: "Sending Congratulations Email To User Process Has Been Successfully !!",
                    error: false,
                    data: {},
                });
            });
        });
    }
    return result;
}

async function sendChangePasswordEmail(email, language) {
    const result = await getPasswordForBussinessEmail(process.env.BUSSINESS_EMAIL);
    if (!result.error) {
        const templateContent = readFileSync(join(__dirname, "..", "..", "assets", "email_templates", "change_password.ejs"), "utf-8");
        const compiledTemplate = compile(templateContent);
        const htmlContentAfterCompilingEjsTemplateFile = compiledTemplate({ language });
        return new Promise((resolve, reject) => {
            emailsUtils.getTransporter(result.data).sendMail({
                from: `${process.env.WEBSITE_NAME} <${process.env.BUSSINESS_EMAIL}>`,
                to: email,
                subject: `تغيير كلمة السر الخاصة بك في ${process.env.WEBSITE_NAME}`,
                html: htmlContentAfterCompilingEjsTemplateFile,
            }, function (error, info) {
                if (error) reject(error);
                resolve({
                    msg: "Sending Change The User Password Email Process Has Been Successfully !!",
                    error: false,
                    data: {},
                });
            });
        });
    }
    return result;
}

module.exports = {
    sendVerificationCodeToUserEmail,
    sendCongratulationsOnCreatingNewAccountEmail,
    sendChangePasswordEmail
}