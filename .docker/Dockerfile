ARG IMAGE_VERSION=2.0.0
FROM yuridefranca/nodejs:${IMAGE_VERSION}

RUN useradd -rm -d /home/docker -s /bin/bash -g root -G sudo -u 1001 -p "$(openssl passwd -6 pass)" docker && \
    chown -R docker:root /home/docker
    
USER docker
WORKDIR /home/docker/app

CMD ["tail", "-f", "/dev/null"]3