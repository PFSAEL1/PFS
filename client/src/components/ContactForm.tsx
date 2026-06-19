import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

// PFS Filters Contact — Zoho CRM Web-to-Lead form.
// The Zoho form ships with its own CSS + a mandatory-check script that expect
// a light page. To avoid clashing with the React app's global styles (and to
// run the Zoho JS in isolation), we render the official Zoho markup inside an
// iframe via srcDoc, then inject dark-theme overrides so it blends into the
// site. The form still POSTs leads straight to Zoho exactly as generated.

const ZOHO_FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  body { font-family: 'Inter', system-ui, Arial, sans-serif; color: #e8eaed; }
  /* ---- Dark-theme overrides for the Zoho form ---- */
  #crmWebToEntityForm.zcwf_lblLeft {
    background-color: transparent !important;
    color: #e8eaed !important;
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  #crmWebToEntityForm .zcwf_title {
    display: none !important; /* page already has a "Send Us a Message" heading */
  }
  #crmWebToEntityForm .zcwf_row { margin: 14px 0 !important; }
  #crmWebToEntityForm .zcwf_col_lab {
    width: 100% !important;
    float: none !important;
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #c9ccd1 !important;
    font-family: 'Inter', system-ui, Arial, sans-serif !important;
  }
  #crmWebToEntityForm .zcwf_col_lab label { color: #c9ccd1 !important; font-size: 13px !important; }
  #crmWebToEntityForm .zcwf_col_fld {
    width: 100% !important;
    float: none !important;
    padding: 0 !important;
  }
  #crmWebToEntityForm .zcwf_col_fld input[type=text],
  #crmWebToEntityForm .zcwf_col_fld input[type=password],
  #crmWebToEntityForm .zcwf_col_fld textarea,
  #crmWebToEntityForm .zcwf_col_fld_slt {
    width: 100% !important;
    float: none !important;
    background: #161616 !important;
    color: #ffffff !important;
    border: 1px solid #3a3a3a !important;
    border-radius: 8px !important;
    padding: 10px 12px !important;
    font-size: 14px !important;
    font-family: 'Inter', system-ui, Arial, sans-serif !important;
    box-sizing: border-box !important;
  }
  #crmWebToEntityForm .zcwf_col_fld input::placeholder { color: #7a7d82 !important; }
  #crmWebToEntityForm .zcwf_col_fld input:focus,
  #crmWebToEntityForm .zcwf_col_fld textarea:focus,
  #crmWebToEntityForm .zcwf_col_fld_slt:focus {
    outline: none !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.25) !important;
  }
  #crmWebToEntityForm .zcwf_col_fld_slt option { background: #161616 !important; color: #fff !important; }
  #crmWebToEntityForm .zcwf_col_help { display: none !important; }
  /* Submit / reset buttons */
  #crmWebToEntityForm .zcwf_button {
    font-size: 15px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
    padding: 11px 26px !important;
    cursor: pointer !important;
    border: none !important;
    max-width: none !important;
  }
  #crmWebToEntityForm .formsubmit.zcwf_button {
    color: #ffffff !important;
    background: #3b82f6 !important;
    margin-right: 10px !important;
  }
  #crmWebToEntityForm .formsubmit.zcwf_button:hover { background: #2f74e0 !important; }
  #crmWebToEntityForm input[type=reset].zcwf_button {
    background: transparent !important;
    color: #c9ccd1 !important;
    border: 1px solid #3a3a3a !important;
  }
  #crmWebToEntityForm input[type=reset].zcwf_button:hover { background: rgba(255,255,255,0.06) !important; }
</style>
</head>
<body>
<div id='crmWebToEntityForm' class='zcwf_lblLeft crmWebToEntityForm'>
  <form id='webform7365078000001463008' action='https://crm.zoho.com/crm/WebToLeadForm' name='WebToLeads7365078000001463008' method='POST' target='_top' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory7365078000001463008()' accept-charset='UTF-8'>
    <input type='text' style='display:none;' name='xnQsjsdp' value='82414cc7c481e269ec947edc4ebdd00a92e8ae14c4733c389f3749bb123f258a'></input>
    <input type='hidden' name='zc_gad' id='zc_gad' value=''></input>
    <input type='text' style='display:none;' name='xmIwtLD' value='8599de6e05111fc77dd833b75331ee9ffb56e4a53615f78a00009c2afac367fd76d5155c7160c5bff6c7b57638153c40'></input>
    <input type='text' style='display:none;' name='actionType' value='TGVhZHM='></input>
    <input type='text' style='display:none;' name='returnURL' value='https://www.pfsfilters.com/thank-you'></input>
    <div class='zcwf_title'>PFS Filters - Website Form</div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='First_Name'>First Name <span style='color:#ef4444;'>*</span></label></div>
      <div class='zcwf_col_fld'><input type='text' id='First_Name' aria-required='true' aria-label='First Name' name='First Name' maxlength='40' placeholder='Your first name'></input><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='Last_Name'>Last Name <span style='color:#ef4444;'>*</span></label></div>
      <div class='zcwf_col_fld'><input type='text' id='Last_Name' aria-required='true' aria-label='Last Name' name='Last Name' maxlength='80' placeholder='Your last name'></input><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='Phone'>Phone</label></div>
      <div class='zcwf_col_fld'><input type='text' id='Phone' aria-required='false' aria-label='Phone' name='Phone' maxlength='30' placeholder='(555) 000-0000'></input><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='Email'>Email</label></div>
      <div class='zcwf_col_fld'><input type='text' ftype='email' autocomplete='false' id='Email' aria-required='false' aria-label='Email' name='Email' maxlength='100' placeholder='your@email.com'></input><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='Company'>Company</label></div>
      <div class='zcwf_col_fld'><input type='text' id='Company' aria-required='false' aria-label='Company' name='Company' maxlength='200' placeholder='Your shop name'></input><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='Lead_Source'>Lead Source</label></div>
      <div class='zcwf_col_fld'>
        <select class='zcwf_col_fld_slt' id='Lead_Source' aria-required='false' aria-label='Lead Source' name='Lead Source'>
          <option value='-None-'>-None-</option>
          <option value='Advertisement'>Advertisement</option>
          <option value='Cold Call'>Cold Call</option>
          <option value='Employee Referral'>Employee Referral</option>
          <option value='External Referral'>External Referral</option>
          <option value='Online Store'>Online Store</option>
          <option value='X (Twitter)'>X (Twitter)</option>
          <option value='Facebook'>Facebook</option>
          <option value='Partner'>Partner</option>
          <option value='Public Relations'>Public Relations</option>
          <option value='Sales Email Alias'>Sales Email Alias</option>
          <option value='Internal Seminar'>Internal Seminar</option>
          <option value='Trade Show'>Trade Show</option>
          <option value='Web Download'>Web Download</option>
          <option value='Web Research'>Web Research</option>
          <option value='Chat'>Chat</option>
        </select>
        <div class='zcwf_col_help'></div>
      </div>
    </div>
    <input type='text' style='display: none;' name='aG9uZXlwb3Q' value=''/>
    <div class='zcwf_row'>
      <div class='zcwf_col_fld'>
        <input type='submit' id='formsubmit' role='button' class='formsubmit zcwf_button' value='Submit' aria-label='Submit' title='Submit'>
        <input type='reset' class='zcwf_button' role='button' name='reset' value='Reset' aria-label='Reset' title='Reset'>
      </div>
    </div>
    <script>
      function validateEmail7365078000001463008(){
        var form = document.forms['WebToLeads7365078000001463008'];
        var emailFld = form.querySelectorAll('[ftype=email]');
        for(var i = 0; i < emailFld.length; i++){
          var emailVal = emailFld[i].value;
          if((emailVal.replace(/^\\s+|\\s+$/g,'')).length != 0){
            var atpos = emailVal.indexOf('@');
            var dotpos = emailVal.lastIndexOf('.');
            if(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length){
              alert('Please enter a valid email address.');
              emailFld[i].focus();
              return false;
            }
          }
        }
        return true;
      }
      function checkMandatory7365078000001463008(){
        var mndFileds = ['First Name','Last Name'];
        var fldLangVal = ['First Name','Last Name'];
        for(var i = 0; i < mndFileds.length; i++){
          var fieldObj = document.forms['WebToLeads7365078000001463008'][mndFileds[i]];
          if(fieldObj){
            if(((fieldObj.value).replace(/^\\s+|\\s+$/g,'')).length == 0){
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            }
          }
        }
        if(!validateEmail7365078000001463008()){ return false; }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
        return true;
      }
    </script>
    <script id='wf_anal' src='https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=90b4cde14f7f30f83d78e89bfab101e4b2cfdabb78b348d30464951fafe3778b2748c6923fa2fc3d61724ce428c75cf1gid1b8b97abe736709c5af4c7e12404b31523a72f7c646b8191a6ce39d4a540f9f9gid300814d3950518353603a4b2a9e1f36fe3d1f7018f770f12890958ccf56c0416gidf6b72fef5304091fbb405772dc04107f7deeada42c58a5226ea881cee111f862&tw=26e7df8948fa3db17f928e3bcaf90ded3eb91db32f59ed67366f702c2580ce28'></script>
  </form>
</div>
</body>
</html>`;

export const ContactForm = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(560);

  // Auto-size the iframe to its content height so there's no inner scrollbar.
  useEffect(() => {
    const resize = () => {
      try {
        const doc = iframeRef.current?.contentWindow?.document;
        if (doc?.body) {
          const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
          if (h > 0) setIframeHeight(h + 16);
        }
      } catch {
        /* cross-origin after submit redirect — ignore */
      }
    };
    const t = setInterval(resize, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Get In Touch</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have questions about our filters? Need a custom size or bulk pricing? Our team is ready to help.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: 'Phone', value: '855-496-7969', href: 'tel:855-496-7969' },
                  { icon: Mail, label: 'Email', value: 'orders@pfsfilters.com', href: 'mailto:orders@pfsfilters.com' },
                  { icon: MapPin, label: 'Location', value: 'Santa Rosa, CA', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-[#161616] border border-[#2a2a2a] rounded-lg">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold hover:text-blue-400 transition-colors">{value}</a>
                      ) : (
                        <p className="font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <h4 className="font-bold mb-2">Need a Custom Quote?</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Tell us your booth make/model and filter dimensions. We'll match your current filters or recommend better alternatives — often at a lower price.
              </p>
            </div>
          </div>

          {/* Zoho Web-to-Lead form (dark-themed, isolated in iframe) */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 md:p-8">
            <h3 className="text-xl font-bold mb-5">Send Us a Message</h3>
            <iframe
              ref={iframeRef}
              title="PFS Filters Contact Form"
              srcDoc={ZOHO_FORM_HTML}
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
              style={{ width: '100%', height: iframeHeight, border: 'none', background: 'transparent' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
