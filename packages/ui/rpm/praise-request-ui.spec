%define name praise-request-ui
%define version 0.1.0
%define release 1
%define buildroot %(mktemp -ud %{_tmppath}/%{name}-%{version}-%{release}-XXXXXX)

Name: %{name}
Version: %{version}
Release: %{release}
Summary: PraiseRequest UI

Group: Installation Script
License: MIT +no-false-attribs License

BuildRoot: %{buildroot}
Requires: nodejs
BuildRequires: nodejs
AutoReqProv: no

%description
Installs PraiseRequest UI

%prep
rm -rf %{_builddir}/%{name}
mkdir %{_builddir}/%{name}
cd %{_builddir}/%{name}

cp -r $BASE_BUILD_DIR/../../../../praise-request .

%build
cd %{_builddir}/%{name}/praise-request
yarn
cd %{_builddir}/%{name}/praise-request/packages/ui
yarn build

%install
cd %{_builddir}/%{name}/praise-request/packages/ui

mkdir -p %{buildroot}/apps
mv %{_builddir}/%{name}/praise-request/packages/ui/build %{buildroot}/apps/praise-request-ui
cp %{_builddir}/%{name}/praise-request/packages/ui/package.json %{buildroot}/apps/praise-request-ui
cp %{_builddir}/%{name}/praise-request/packages/ui/pm2.json %{buildroot}/apps/praise-request-ui
cp -r %{_builddir}/%{name}/praise-request/packages/ui/server %{buildroot}/apps/praise-request-ui
cp -r %{_builddir}/%{name}/praise-request/node_modules %{buildroot}/apps/praise-request-ui

%post
echo "By Jove! This might just have worked!"

%clean
rm -rf %{buildroot}

%files
%attr(-, praise, praise) /apps/praise-request-ui
