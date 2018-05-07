%define name praise-request
%define version 0.1.0
%define release 1
%define buildroot %(mktemp -ud %{_tmppath}/%{name}-%{version}-%{release}-XXXXXX)

Name: %{name}
Version: %{version}
Release: %{release}
Summary: PraiseRequest

Group: Installation Script
License: MIT +no-false-attribs License

BuildRoot: %{buildroot}
Requires: nodejs
BuildRequires: nodejs
AutoReqProv: no

%description
Installs PraiseRequest

%prep

%build
cd praise-request
yarn
yarn build

%pre
getent group praise-request >/dev/null || groupadd -r praise-request
getent passwd praise-request >/dev/null || useradd -r -g praise-request -G praise-request -d / -s /sbin/nologin -c "praise-request" praise-request

%install
mkdir -p %{buildroot}/usr/lib/praise-request
cp -r ./ %{buildroot}/usr/lib/praise-request
mkdir -p %{buildroot}/var/log/praise-request

%post
# systemctl enable /usr/lib/praise-request/praise-request.service

%clean
rm -rf %{buildroot}

%files
%defattr(644, praise-request, praise-request, 755)
/usr/lib/praise-request
/var/log/praise-request
