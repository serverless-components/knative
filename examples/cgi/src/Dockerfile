# Simple CGI bin used with Apache
FROM httpd
RUN chgrp -R 0 logs && chmod -R g=u logs
ADD httpd.conf conf/
ADD hello cgi-bin/
RUN chmod a+x cgi-bin/hello
